import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {inspectSnippet} from '../src/seo.mjs';

test('empty title gives an actionable note',()=>{const result=inspectSnippet('   ','');assert.equal(result.empty,true);assert.match(result.titleNote,/Добавьте/);assert.match(result.descriptionNote,/Добавьте/);});
test('Unicode title count uses code points',()=>assert.equal(inspectSnippet('Сайт 🌧','Описание').length,6));
test('long title warns without claiming a ranking limit',()=>{const result=inspectSnippet('а'.repeat(66),'Описание');assert.match(result.titleNote,/может быть/);assert.match(result.descriptionNote,/может показать другое/);});
test('short title does not promise search positions',()=>assert.doesNotMatch(inspectSnippet('Разработка сайтов','Описание').titleNote,/ТОП|гарант|позици/));
test('prototype keeps five different service directions',()=>{const source=readFileSync(new URL('../src/ServiceDemos.tsx',import.meta.url),'utf8');for(const id of ['development','seo','aeo','pf','local'])assert.ok(source.includes(`id:'${id}'`));assert.match(source,/Вымышленный учебный пример/);assert.match(source,/риски санкций/);});
test('viewer close icon cannot intercept clicks and keeps 44px target',()=>{const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');assert.match(css,/\.icon-button svg\{pointer-events:none\}/);assert.match(css,/\.icon-button\{width:44px;height:44px\}/);});
test('reduced motion, noindex and private local tool remain explicit',()=>{const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');const demo=readFileSync(new URL('../src/ServiceDemos.tsx',import.meta.url),'utf8');assert.match(css,/prefers-reduced-motion:reduce/);assert.match(html,/noindex, nofollow/);assert.match(demo,/Данные никуда не отправляются/);assert.doesNotMatch(demo,/dangerouslySetInnerHTML/);});
