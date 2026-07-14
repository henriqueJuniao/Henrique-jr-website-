import fs from 'node:fs';

const reportPath = process.argv[2] ?? '/home/ubuntu/henriquejr-v1/lighthouse-report.json';
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
for (const [categoryId, category] of Object.entries(report.categories)) {
  console.log(`\n${categoryId.toUpperCase()} ${Math.round(category.score * 100)}`);
  for (const ref of category.auditRefs) {
    const audit = report.audits[ref.id];
    if (audit && audit.score !== null && audit.score < 1) {
      const display = audit.displayValue ? ` | ${audit.displayValue}` : '';
      console.log(`${audit.score === 0 ? 'FAIL' : 'WARN'} | ${audit.id} | ${audit.title}${display}`);
    }
  }
}

console.log('\nDETAILS');
for (const id of ['largest-contentful-paint-element', 'lcp-discovery-insight', 'render-blocking-insight', 'unused-javascript', 'total-byte-weight', 'color-contrast', 'errors-in-console', 'deprecations', 'bf-cache']) {
  const audit = report.audits[id];
  if (!audit) continue;
  console.log(`\n[${id}] ${audit.displayValue ?? ''}`);
  const items = audit.details?.items ?? [];
  for (const item of items.slice(0, 12)) {
    console.log(JSON.stringify(item));
  }
}

console.log('\nKEY METRICS');
for (const id of ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index']) {
  const audit = report.audits[id];
  console.log(`${id}: ${audit?.displayValue ?? 'n/a'}`);
}
