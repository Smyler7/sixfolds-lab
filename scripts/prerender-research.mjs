import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import { buildSync } from 'esbuild';
import { siteBase } from '../src/site-config.js';

const require = createRequire(import.meta.url);
const React = require('react');
const { renderToString } = require('react-dom/server');
const { MemoryRouter } = require('react-router-dom');
const siteUrl = (process.env.SITE_URL || 'https://smyler7.github.io/sixfolds-lab').replace(/\/$/, '');
const outputRoot = resolve('dist');
const compiledApp = buildSync({
  entryPoints: ['src/App.tsx'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
  external: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  loader: { '.css': 'empty' },
  define: { 'import.meta.env.BASE_URL': JSON.stringify(siteBase) },
});

const appModule = new Module(resolve('__research-prerender.cjs'));
appModule.filename = resolve('__research-prerender.cjs');
appModule.paths = Module._nodeModulePaths(process.cwd());
appModule._compile(compiledApp.outputFiles[0].text, appModule.filename);
const App = appModule.exports.default;
const compiledResearchData = buildSync({
  entryPoints: ['src/research/explorations.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
});
const dataModule = new Module(resolve('__research-data-prerender.cjs'));
dataModule.filename = resolve('__research-data-prerender.cjs');
dataModule.paths = Module._nodeModulePaths(process.cwd());
dataModule._compile(compiledResearchData.outputFiles[0].text, dataModule.filename);
const { explorations } = dataModule.exports;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function setMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}"/>`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function addCanonical(html, canonical) {
  const tag = `<link rel="canonical" href="${escapeHtml(canonical)}"/>`;
  return html.replace('</head>', `  ${tag}\n</head>`);
}

const template = await readFile(resolve(outputRoot, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('Built app root was not found in dist/index.html.');

const routes = [
  {
    path: '/research/',
    title: 'Research - Sixfolds Lab',
    description: 'Exploratory notes on applied AI, software engineering and responsible product development.',
  },
  ...explorations.map((exploration) => ({
    path: `/research/${exploration.slug}/`,
    title: `${exploration.title} - Research | Sixfolds Lab`,
    description: exploration.summary,
  })),
];

for (const route of routes) {
  const entry = `${siteBase.replace(/\/$/, '')}${route.path}`;
  const appMarkup = renderToString(React.createElement(
    MemoryRouter,
    { basename: siteBase, initialEntries: [entry] },
    React.createElement(App),
  ));
  const canonical = `${siteUrl}${route.path}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${appMarkup}</div>`);
  html = setMeta(html, 'name', 'description', route.description);
  html = setMeta(html, 'property', 'og:title', route.title);
  html = setMeta(html, 'property', 'og:description', route.description);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = addCanonical(html, canonical);

  const outputPath = resolve(outputRoot, route.path.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
  console.log(`Prerendered ${route.path} to ${outputPath}`);
}
