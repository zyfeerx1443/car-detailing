// Shared helpers: phone normalization, outreach message, output files.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const OUT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const DEMO_URL = "https://car-detailing-liard.vercel.app";

// Polish mobile number prefixes (national number, first 2 digits).
const PL_MOBILE_PREFIXES = new Set([
  "45", "50", "51", "53", "57", "60", "66", "69", "72", "73", "78", "79", "88",
]);

export function normalizePhone(raw) {
  if (!raw) return null;
  let digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 9) digits = "48" + digits;
  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

export function isPolishMobile(digits) {
  return (
    !!digits &&
    digits.length === 11 &&
    digits.startsWith("48") &&
    PL_MOBILE_PREFIXES.has(digits.slice(2, 4))
  );
}

/** "Foo Detailing - Folie PPF | Ceramika Warszawa" → "Foo Detailing" */
export function shortName(name) {
  const first = name.split(/\s+[|–—\-·]\s+|\s*\|\s*/)[0].trim();
  return (first.length >= 3 ? first : name).slice(0, 60);
}

export function buildDemoUrl(lead) {
  const params = new URLSearchParams({ name: lead.short_name });
  if (lead.address) params.set("address", lead.address.replace(/,\s*Polska$/i, ""));
  if (lead.phone_e164) params.set("phone", lead.phone_e164);
  return `${DEMO_URL}/?${params.toString()}`;
}

export function buildMessage(lead) {
  return (
    `Dzień dobry! Znaleźliśmy ${lead.short_name} w Mapach Google. ` +
    `Przygotowaliśmy demo strony dla studia detailingu z kalkulatorem wyceny online — ` +
    `tak mogłaby wyglądać Państwa strona: ${lead.demo_url} ` +
    `Czy byliby Państwo zainteresowani taką wersją dla swojego studia? Pozdrawiamy serdecznie`
  );
}

export function buildWhatsAppUrl(lead) {
  if (!lead.phone_e164) return null;
  return `https://wa.me/${lead.phone_e164}?text=${encodeURIComponent(buildMessage(lead))}`;
}

/** Fills derived fields (short name, demo link, message, wa.me link). */
export function enrichLead(lead) {
  lead.short_name = lead.short_name || shortName(lead.name);
  lead.demo_url = buildDemoUrl(lead);
  lead.message = buildMessage(lead);
  lead.whatsapp_url = buildWhatsAppUrl(lead);
  return lead;
}

/** Phones already messaged (contacted.txt, one per line, # = comment). */
export async function loadContacted() {
  try {
    const text = await readFile(path.join(OUT_DIR, "contacted.txt"), "utf8");
    return new Set(
      text
        .split(/\r?\n/)
        .filter((line) => line.trim() && !line.trim().startsWith("#"))
        .map(normalizePhone)
        .filter(Boolean)
    );
  } catch {
    return new Set();
  }
}

const CSV_COLUMNS = [
  "name", "short_name", "category", "address", "phone", "phone_e164", "is_mobile",
  "rating", "reviews_count", "reviews_verified", "website", "website_type",
  "maps_url", "demo_url", "message", "whatsapp_url",
];

function toCsv(rows) {
  const esc = (v) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    return /[",\n\r;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [CSV_COLUMNS.join(",")];
  for (const row of rows) lines.push(CSV_COLUMNS.map((c) => esc(row[c])).join(","));
  // BOM so Excel opens Polish characters correctly.
  return "﻿" + lines.join("\r\n") + "\r\n";
}

export async function saveResults(leads) {
  await writeFile(path.join(OUT_DIR, "leads.json"), JSON.stringify(leads, null, 2), "utf8");
  await writeFile(path.join(OUT_DIR, "leads.csv"), toCsv(leads), "utf8");
}
