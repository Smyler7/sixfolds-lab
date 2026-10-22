import { mkdir, writeFile } from 'node:fs/promises';

const origin = process.env.SITE_URL?.replace(/\/$/, '');
if (!origin || !/^https:\/\//i.test(origin)) {
  console.error('Set SITE_URL to the verified production origin before generating a sitemap.');
  process.exit(1);
}
const paths = [
  '/', '/products', '/products/agentforge', '/products/zimbiz-os', '/products/gpa-plus',
  '/products/cybersentinel', '/products/devpilot-africa', '/solutions', '/solutions/businesses',
  '/solutions/education', '/solutions/developers', '/research', '/research/building-with-human-oversight',
  '/research/useful-ai-by-design', '/research/software-that-explains-itself', '/company', '/careers',
  '/contact', '/blog', '/privacy', '/terms', '/security'
];
const urls = paths.map(path => `  <url><loc>${origin}${path}</loc></url>`).join('\n');
await mkdir('public', { recursive: true });
await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, 'utf8');
console.log(`Wrote sitemap for ${paths.length} public routes at ${origin}.`);
