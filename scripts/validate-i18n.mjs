import fs from "node:fs";
import path from "node:path";

const LOCALES = ["ar", "en", "fr", "ru", "tr"];
const SERVICE_IDS = [
  "liver-transplantation",
  "kidney-transplantation",
  "parkinsons-disease",
  "orthopedic-surgery",
  "neurosurgery",
  "urology-prostate",
  "endocrinology",
  "gastroenterology",
  "oncology",
  "cardiology",
  "rehabilitation-physiotherapy",
  "hematology",
];

const GUIDE_IDS = [
  "transplant-law-foreign-patients",
  "who-can-be-a-living-donor",
  "ethics-commission-documents-approval",
];

// Decorative emoji regex (excludes standard © ® ™ symbols)
const EMOJI_RE = /(?!©|®|™)\p{Extended_Pictographic}/gu;

let errors = 0;
function fail(msg) {
  console.error(`[i18n-check] ERROR: ${msg}`);
  errors++;
}

function collectPaths(obj, prefix = "", out = new Map()) {
  if (Array.isArray(obj)) {
    out.set(prefix, `array:${obj.length}`);
    obj.forEach((item, idx) => collectPaths(item, `${prefix}[${idx}]`, out));
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      collectPaths(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out.set(prefix, typeof obj);
    if (typeof obj === "string") {
      if (obj.trim().length === 0) fail(`Empty translation value at "${prefix}"`);
      if (/^[a-z]+\.[a-zA-Z0-9_.]+$/.test(obj.trim())) {
        fail(`Value looks like an untranslated key path at "${prefix}": "${obj}"`);
      }
      const em = obj.match(EMOJI_RE);
      if (em) fail(`Emoji found in translation at "${prefix}": ${em.join(" ")}`);
    }
  }
  return out;
}

const enLocale = JSON.parse(fs.readFileSync("content/locales/en.json", "utf8"));
const enServices = JSON.parse(fs.readFileSync("content/services/en.json", "utf8"));
const enGuides = JSON.parse(fs.readFileSync("content/guides/en.json", "utf8"));
const enLocalePaths = collectPaths(enLocale);
const enServicePaths = collectPaths(enServices);
const enGuidePaths = collectPaths(enGuides);

for (const id of SERVICE_IDS) {
  if (!(id in enServices)) fail(`Missing service ID "${id}" in content/services/en.json`);
}

for (const id of GUIDE_IDS) {
  if (!(id in enGuides)) fail(`Missing guide ID "${id}" in content/guides/en.json`);
}

for (const loc of LOCALES) {
  const locFile = `content/locales/${loc}.json`;
  const srvFile = `content/services/${loc}.json`;
  const guideFile = `content/guides/${loc}.json`;
  if (!fs.existsSync(locFile)) {
    fail(`Missing file ${locFile}`);
    continue;
  }
  if (!fs.existsSync(srvFile)) {
    fail(`Missing file ${srvFile}`);
    continue;
  }
  if (!fs.existsSync(guideFile)) {
    fail(`Missing file ${guideFile}`);
    continue;
  }

  const locData = JSON.parse(fs.readFileSync(locFile, "utf8"));
  const srvData = JSON.parse(fs.readFileSync(srvFile, "utf8"));
  const guideData = JSON.parse(fs.readFileSync(guideFile, "utf8"));

  const locPaths = collectPaths(locData);
  const srvPaths = collectPaths(srvData);
  const guidePaths = collectPaths(guideData);

  for (const [k, t] of enLocalePaths.entries()) {
    if (!locPaths.has(k)) fail(`${locFile}: missing key "${k}"`);
    else if (locPaths.get(k) !== t) {
      fail(`${locFile}: type/length mismatch at "${k}" (expected ${t}, got ${locPaths.get(k)})`);
    }
  }
  for (const k of locPaths.keys()) {
    if (!enLocalePaths.has(k)) fail(`${locFile}: extra key "${k}" not in en.json`);
  }

  for (const [k, t] of enServicePaths.entries()) {
    if (!srvPaths.has(k)) fail(`${srvFile}: missing key "${k}"`);
    else if (srvPaths.get(k) !== t) {
      fail(`${srvFile}: type/length mismatch at "${k}" (expected ${t}, got ${srvPaths.get(k)})`);
    }
  }
  for (const k of srvPaths.keys()) {
    if (!enServicePaths.has(k)) fail(`${srvFile}: extra key "${k}" not in en.json`);
  }

  for (const [k, t] of enGuidePaths.entries()) {
    if (!guidePaths.has(k)) fail(`${guideFile}: missing key "${k}"`);
    else if (guidePaths.get(k) !== t) {
      fail(`${guideFile}: type/length mismatch at "${k}" (expected ${t}, got ${guidePaths.get(k)})`);
    }
  }
  for (const k of guidePaths.keys()) {
    if (!enGuidePaths.has(k)) fail(`${guideFile}: extra key "${k}" not in en.json`);
  }
}

// Scan source files for decorative emojis
function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git", "public"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanDir(full);
    else if (/\.(ts|tsx)$/.test(entry.name)) {
      const src = fs.readFileSync(full, "utf8");
      const em = src.match(EMOJI_RE);
      if (em) fail(`Decorative emoji found in ${full}: ${em.join(" ")}`);
    }
  }
}
scanDir("app");
scanDir("components");
scanDir("lib");

if (errors > 0) {
  console.error(`[i18n-check] Failed with ${errors} error(s).`);
  process.exit(1);
}
console.log(
  `[i18n-check] OK — validated ${LOCALES.length} locales (${enLocalePaths.size} UI keys + ${enServicePaths.size} service keys + ${enGuidePaths.size} guide keys each) & zero decorative emojis.`
);
