/**
 * Google Maps lead collector for detailing studios.
 *
 * Collects: name, category, address, phone, rating, review count, website.
 * Keeps only places with >= MIN_REVIEWS reviews and NO real website
 * (none, or only Instagram / Facebook / Booksy / linktr.ee).
 * Writes leads.json + leads.csv with a personalized demo link and wa.me URL.
 *
 * Usage:   node scrape-leads.mjs
 * Env:     QUERY="auto detailing Warszawa"  TARGET=20  MAX_CANDIDATES=120
 *          MIN_REVIEWS=5  HEADLESS=0 (show browser)
 */
import { chromium } from "playwright";
import path from "node:path";
import {
  OUT_DIR,
  enrichLead,
  isPolishMobile,
  loadContacted,
  normalizePhone,
  saveResults,
} from "./lib.mjs";

const CONFIG = {
  query: process.env.QUERY || "auto detailing Warszawa",
  targetLeads: Number(process.env.TARGET || 20),
  maxCandidates: Number(process.env.MAX_CANDIDATES || 120),
  minReviews: Number(process.env.MIN_REVIEWS || 5),
  headless: process.env.HEADLESS !== "0",
};

// Hosts that count as "no real website" (social / booking / link-in-bio).
const SOCIAL_HOSTS = {
  "instagram.com": "instagram",
  "facebook.com": "facebook",
  "fb.com": "facebook",
  "fb.me": "facebook",
  "booksy.com": "booksy",
  "linktr.ee": "linktree",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (min, max) => sleep(min + Math.random() * (max - min));

// ---------------------------------------------------------------- helpers

function classifyWebsite(url) {
  if (!url) return "none";
  let host;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return "invalid";
  }
  host = host.replace(/^(www|m|l|web|business)\./, "");
  for (const [domain, type] of Object.entries(SOCIAL_HOSTS)) {
    if (host === domain || host.endsWith("." + domain)) return type;
  }
  return "website";
}

// ---------------------------------------------------------------- browser steps

async function dismissConsent(page) {
  // EU users get a Google consent screen/dialog first.
  const button = page
    .getByRole("button", { name: /odrzuć wszystko|reject all|zaakceptuj wszystko|accept all/i })
    .first();
  try {
    await button.waitFor({ state: "visible", timeout: 6000 });
    await button.click();
    await page.waitForLoadState("domcontentloaded");
    console.log("• Consent dialog dismissed");
  } catch {
    /* no consent screen */
  }
}

async function collectPlaceUrls(page) {
  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    CONFIG.query
  )}?hl=pl`;
  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });
  await dismissConsent(page);

  const feed = page.locator('div[role="feed"]');
  await feed.waitFor({ timeout: 30000 });

  const urls = new Map(); // dedupe by place path
  let stagnantRounds = 0;

  while (urls.size < CONFIG.maxCandidates && stagnantRounds < 6) {
    const hrefs = await page.$$eval('div[role="feed"] a[href*="/maps/place/"]', (as) =>
      as.map((a) => a.href)
    );
    const before = urls.size;
    for (const href of hrefs) {
      const key = href.split("?")[0];
      if (!urls.has(key)) urls.set(key, href);
    }

    const reachedEnd = await page
      .locator("text=/Dotarłeś do końca listy|reached the end of the list/i")
      .count();
    if (reachedEnd) break;

    stagnantRounds = urls.size === before ? stagnantRounds + 1 : 0;
    await feed.evaluate((el) => el.scrollBy(0, el.scrollHeight));
    await jitter(1200, 2000);
  }

  console.log(`• Found ${urls.size} places in search results`);
  return [...urls.values()].slice(0, CONFIG.maxCandidates);
}

async function scrapePlace(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator("h1.DUwDvf").first().waitFor({ timeout: 20000 });
  await page.waitForTimeout(700);

  return page.evaluate(() => {
    const clean = (s) => (s || "").replace(/[  -]/g, " ").replace(/\s+/g, " ").trim() || null;

    const name = clean(document.querySelector("h1.DUwDvf")?.textContent);
    const category = clean(document.querySelector("button.DkEaL")?.textContent);

    // Rating + review count: "4,9(123)" inside div.F7nice
    const ratingText = document.querySelector("div.F7nice")?.innerText || "";
    const ratingMatch = ratingText.match(/(\d)[.,](\d)/);
    let reviewsMatch = ratingText.match(/\(([\d\s .,]+)\)/);
    if (!reviewsMatch) {
      const labelled = [...document.querySelectorAll("[aria-label]")]
        .map((el) => el.getAttribute("aria-label"))
        .find((l) => /^\s*[\d\s .,]+\s+(opinii|opinie|opinia|recenzj|reviews?)/i.test(l));
      if (labelled) reviewsMatch = labelled.match(/([\d\s .,]+)/);
    }

    const addressBtn = document.querySelector('button[data-item-id="address"]');
    const address = clean(
      addressBtn?.querySelector(".Io6YTe")?.textContent ||
        addressBtn?.getAttribute("aria-label")?.replace(/^Adres:\s*/i, "")
    );

    const phoneBtn = document.querySelector('button[data-item-id^="phone:tel:"]');
    const phone =
      clean(phoneBtn?.querySelector(".Io6YTe")?.textContent) ||
      clean(phoneBtn?.getAttribute("data-item-id")?.replace("phone:tel:", ""));

    let website = document.querySelector('a[data-item-id="authority"]')?.href || null;
    if (website && /google\.[a-z.]+\/url\?/.test(website)) {
      website = new URL(website).searchParams.get("q") || website;
    }

    return {
      name,
      category,
      address,
      phone,
      rating: ratingMatch ? Number(`${ratingMatch[1]}.${ratingMatch[2]}`) : null,
      // Signed-out Google Maps ("limited view") often hides review counts → null.
      reviews_count: reviewsMatch ? Number(reviewsMatch[1].replace(/\D/g, "")) : null,
      website,
    };
  });
}

// ---------------------------------------------------------------- main

async function main() {
  console.log(`Query: "${CONFIG.query}" · target ${CONFIG.targetLeads} leads · min ${CONFIG.minReviews} reviews`);

  const browser = await chromium.launch({ headless: CONFIG.headless });
  const context = await browser.newContext({
    locale: "pl-PL",
    timezoneId: "Europe/Warsaw",
    viewport: { width: 1366, height: 900 },
  });
  const page = await context.newPage();

  const leads = [];
  const contacted = await loadContacted();
  if (contacted.size) console.log(`• Skipping ${contacted.size} already-contacted numbers (contacted.txt)`);
  const stats = { checked: 0, fewReviews: 0, hasWebsite: 0, noPhone: 0, contacted: 0, errors: 0 };

  try {
    const placeUrls = await collectPlaceUrls(page);

    for (const url of placeUrls) {
      if (leads.length >= CONFIG.targetLeads) break;
      stats.checked++;

      let place;
      try {
        place = await scrapePlace(page, url);
      } catch (err) {
        stats.errors++;
        console.warn(`  ! Failed: ${url.slice(0, 80)}… (${err.message.split("\n")[0]})`);
        continue;
      }

      const websiteType = classifyWebsite(place.website);
      const reviewsKnown = place.reviews_count !== null;
      const tag = `${place.name} [${reviewsKnown ? place.reviews_count : "?"} opinii, ★${
        place.rating ?? "–"
      }, site: ${websiteType}]`;

      // If the review count is visible, enforce MIN_REVIEWS. If Google hides it,
      // fall back to "has a star rating" (= at least one real review).
      const tooFewReviews = reviewsKnown
        ? place.reviews_count < CONFIG.minReviews
        : place.rating === null;

      if (tooFewReviews) {
        stats.fewReviews++;
        console.log(`  – skip (few reviews): ${tag}`);
      } else if (websiteType === "website") {
        stats.hasWebsite++;
        console.log(`  – skip (has website): ${tag}`);
      } else {
        const phoneE164 = normalizePhone(place.phone);
        if (!phoneE164) {
          stats.noPhone++;
          console.log(`  – skip (no phone): ${tag}`);
        } else if (contacted.has(phoneE164)) {
          stats.contacted++;
          console.log(`  – skip (already contacted): ${tag}`);
        } else {
          const lead = {
            ...place,
            reviews_verified: reviewsKnown,
            phone_e164: phoneE164,
            is_mobile: isPolishMobile(phoneE164),
            website_type: websiteType,
            maps_url: url,
          };
          leads.push(enrichLead(lead));
          console.log(`  ✓ LEAD ${leads.length}: ${tag}`);
          await saveResults(leads); // incremental save
        }
      }

      await jitter(1500, 3000); // be gentle with Google
    }
  } finally {
    await saveResults(leads);
    await browser.close();
  }

  console.log("\nDone.");
  console.log(
    `Checked ${stats.checked} · leads ${leads.length} · few reviews ${stats.fewReviews} · ` +
      `has website ${stats.hasWebsite} · no phone ${stats.noPhone} · ` +
      `already contacted ${stats.contacted} · errors ${stats.errors}`
  );
  console.log(`Saved: ${path.join(OUT_DIR, "leads.json")} / leads.csv`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
