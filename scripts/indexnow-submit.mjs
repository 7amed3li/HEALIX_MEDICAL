#!/usr/bin/env node
/**
 * IndexNow submitter for healixistanbul.com.tr
 *
 * Reads every URL from the live sitemap (handles a sitemap index too) and
 * submits them to IndexNow, so Bing (and therefore ChatGPT Search) learns
 * about new/updated pages within hours instead of waiting for a crawl.
 *
 * Prerequisite: the key file must be live at
 *   https://www.healixistanbul.com.tr/8de951682eb34f188b7aacfc4432ab34.txt
 * (it ships in public/ with this change — it only works AFTER deploy).
 *
 * Usage:  node scripts/indexnow-submit.mjs [sitemapUrl]
 * Requires Node 18+ (global fetch). No dependencies.
 */

const KEY = "8de951682eb34f188b7aacfc4432ab34";
const DEFAULT_SITEMAP = "https://www.healixistanbul.com.tr/sitemap.xml";
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const BATCH_SIZE = 10000; // IndexNow limit per request

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1].trim());
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": "healix-indexnow/1.0" } });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.text();
}

async function collectUrls(sitemapUrl) {
  const xml = await fetchText(sitemapUrl);
  const locs = extractLocs(xml);
  if (/<sitemapindex[\s>]/i.test(xml)) {
    const all = [];
    for (const child of locs) {
      const childXml = await fetchText(child);
      all.push(...extractLocs(childXml));
    }
    return [...new Set(all)];
  }
  return [...new Set(locs)];
}

async function main() {
  const sitemapUrl = process.argv[2] || DEFAULT_SITEMAP;
  const urls = await collectUrls(sitemapUrl);
  if (urls.length === 0) throw new Error(`No URLs found in ${sitemapUrl}`);

  const host = new URL(urls[0]).host;
  const keyLocation = `https://${host}/${KEY}.txt`;
  console.log(`Submitting ${urls.length} URLs for host ${host}`);
  console.log(`Key location: ${keyLocation}`);

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: KEY, keyLocation, urlList: batch }),
    });
    // 200 = accepted, 202 = accepted (key validation pending)
    console.log(`Batch ${i / BATCH_SIZE + 1}: ${batch.length} URLs -> ${res.status} ${res.statusText}`);
    if (res.status !== 200 && res.status !== 202) {
      const body = await res.text();
      throw new Error(`IndexNow rejected the batch: ${res.status} ${body}`);
    }
  }
  console.log("Done. Check Bing Webmaster Tools > IndexNow for received URLs.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
