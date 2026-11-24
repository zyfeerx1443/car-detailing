/**
 * Rebuilds messages / demo links / wa.me links in leads.json + leads.csv
 * from the already-scraped data (no Google requests), and drops numbers
 * listed in contacted.txt.
 *
 * Usage: node regenerate.mjs
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { OUT_DIR, enrichLead, loadContacted, saveResults } from "./lib.mjs";

const leads = JSON.parse(await readFile(path.join(OUT_DIR, "leads.json"), "utf8"));
const contacted = await loadContacted();

const kept = [];
for (const lead of leads) {
  if (contacted.has(lead.phone_e164)) {
    console.log(`– removed (already contacted): ${lead.name} — ${lead.phone}`);
    continue;
  }
  kept.push(enrichLead(lead));
}

await saveResults(kept);
console.log(`Saved ${kept.length} leads (removed ${leads.length - kept.length}).`);
