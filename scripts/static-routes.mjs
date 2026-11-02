import { readFile, mkdir, writeFile } from 'node:fs/promises';
import {pageMetadata} from '../src/serviceArchitecture.ts';

const routes = [
  ['services/', 'Услуги — Rainy Web'],
  ['cases/', 'Кейсы — Rainy Web'],
  ['cases/pirr/', 'PIRR — Rainy Web'],
  ['cases/north-court/', 'North Court — Rainy Web'],
];
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const [route, meta] of Object.entries(pageMetadata)) {
  if(route==='/')continue;
  const path=route.slice(1),title=meta.title+' — Rainy Web';
  const directory = new URL(`../dist/${path}`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), template.replace(/<title>.*?<\/title>/, `<title>${title}</title>`).replace(/name="description" content="[^"]*"/,`name="description" content="${meta.description}"`));
}
await writeFile(new URL('../dist/404.html', import.meta.url), template);
console.log(`Static entry documents generated for ${Object.keys(pageMetadata).length} canonical routes.`);
