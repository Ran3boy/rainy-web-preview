import { readFile, mkdir, writeFile } from 'node:fs/promises';

const routes = [
  ['services/', 'Услуги — Rainy Web'],
  ['cases/', 'Кейсы — Rainy Web'],
  ['cases/pirr/', 'PIRR — Rainy Web'],
  ['cases/north-court/', 'North Court — Rainy Web'],
];
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const [path, title] of routes) {
  const directory = new URL(`../dist/${path}`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), template.replace(/<title>.*?<\/title>/, `<title>${title}</title>`));
}
await writeFile(new URL('../dist/404.html', import.meta.url), template);
console.log(`Static entry documents generated for ${routes.length + 1} canonical routes.`);
