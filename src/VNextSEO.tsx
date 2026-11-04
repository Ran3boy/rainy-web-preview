import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,ArrowRight,Check,Plus,Search} from 'lucide-react';
import {SnippetDemo} from './ServiceDemos';
import {Breadcrumbs} from './StructurePages';
import {categories,serviceItems} from './serviceArchitecture';
import {SearchResultStory,ContextCTA} from './VNextShared';
import type {Open} from './ui';

const problems=[
 {name:'Сайт есть. Из поиска почти не приходят.',intro:'Начну с причин, а не с обещания позиций.',points:['Проверю доступность страниц и индексацию.','Сопоставлю структуру сайта с задачами покупателей.','Соберу приоритеты для дальнейшей работы.']},
 {name:'Позиции остановились.',intro:'Посмотрю на запрос, страницу и изменения вместе.',points:['Проверю содержание и мета-теги приоритетных страниц.','Разберу технические ограничения и внутренние ссылки.','Отделю динамику позиций от изменений в визитах.']},
 {name:'Новый сайт. Нужна поисковая основа.',intro:'Заложу поисковую логику до публикации.',points:['Согласую структуру и назначение страниц.','Подготовлю требования к содержанию и метаданным.','Проверю техническую доступность после запуска.']},
];
const workflow=[
 ['Аудит','Понимаю исходную ситуацию.','Список проблем с приоритетами','Техническая проверка, доступные данные и страницы, с которых стоит начать.'],
 ['Структура','У каждой страницы — своя задача.','Карта страниц и поисковых задач','Семантика и группировка запросов помогают определить, какие страницы создавать и какие объединять.'],
 ['Содержание','Ответ на запрос важнее повторения слов.','Рекомендации и изменения страниц','Тексты, заголовки, мета-теги и внутренние переходы — в контексте конкретной страницы.'],
 ['Техника','Поиску нужно видеть сайт.','Проверенные технические изменения','Индексация, доступность, дубли, ссылки и ограничения платформы — в пределах согласованного объёма.'],
 ['Измерение','Смотрю, что изменилось.','Отчёт с источниками и периодами','Topvisor — позиции запросов. Метрика — поисковые визиты. Заявки и продажи учитываются отдельно, если настроены и доступны.'],
] as const;
const faq=[
 ['Можно начать с одной страницы?','Да. Аудит, мета-теги, содержание, технические задачи и дооптимизация отдельных страниц доступны отдельно. Сначала уточню задачу и доступы.'],
 ['Когда будет результат?','Срок зависит от состояния сайта, конкуренции и состава изменений. До начала работы согласую этапы и способ проверки; гарантированных сроков выхода в ТОП нет.'],
 ['От чего зависит стоимость?','От исходного состояния, объёма страниц, платформы, необходимого исследования и сложности внедрения. Оценку обсуждаю после знакомства с задачей, без выдуманного универсального тарифа.'],
 ['Что будет в отчёте?','Выполненные изменения, позиции по согласованным запросам и поисковые визиты с источниками и периодами. Рост визитов не выдаю за рост заявок или продаж.'],
] as const;
const seo=categories.find(c=>c.id==='seo')!;
const inventory=serviceItems.filter(s=>s.category==='seo');
const groups=[...new Set(inventory.map(s=>s.group))];

export default function SEOPage({open}:{open:Open}){
 const[problem,setProblem]=useState(0);const[stage,setStage]=useState(0);
 const[group,setGroup]=useState(groups[0]);const[selected,setSelected]=useState(inventory[0].id);
 return <article className="v-next seo-next"><div className="container"><Breadcrumbs label="SEO-продвижение" parent/><header className="seo-signature"><div className="seo-offer"><h1>SEO.<br/>Сначала —<br/><span>суть.</span></h1><p>Помогаю сайту отвечать на поисковые задачи: от структуры и технической основы до содержания страниц и контроля изменений.</p><button className="vn-button" onClick={()=>open({kind:'contact',value:seo.name})}>Обсудить ваш сайт<ArrowUpRight size={20}/></button><a className="vn-link" href="#seo-results">Посмотреть результаты<ArrowDownIcon/></a><div className="seo-offer-note"><Search size={20}/><p>Органический поиск Яндекса и Google.<br/>Работаю лично, без рекламных кампаний.</p></div></div><div className="seo-hero-tool"><div className="tool-heading"><span>Как страница встречает человека в поиске</span><span>Попробуйте изменить</span></div><SnippetDemo/></div></header>

 <section className="vn-section seo-problems"><div className="editorial-heading"><h2>Узнаёте<br/><span>свою ситуацию?</span></h2><p>Объём работы начинается<br/>с конкретной проблемы.</p></div><div className="problem-layout"><div className="problem-picker" role="group" aria-label="Исходная ситуация">{problems.map((p,i)=><button key={p.name} aria-pressed={problem===i} onClick={()=>setProblem(i)}>{p.name}<ArrowUpRight size={22}/></button>)}</div><div className="problem-response" aria-live="polite"><h3>{problems[problem].intro}</h3><ul>{problems[problem].points.map(p=><li key={p}><Check size={18}/>{p}</li>)}</ul><button className="vn-link" onClick={()=>open({kind:'contact',value:`SEO: ${problems[problem].name}`})}>Разобрать мою ситуацию<ArrowRight size={18}/></button></div></div></section>

 <section className="vn-section seo-evidence" id="seo-results"><div className="editorial-heading"><h2>Результат,<br/><span>у которого есть источник.</span></h2><Link className="vn-link" to="/cases/?filter=seo">Другие SEO-кейсы<ArrowUpRight size={18}/></Link></div><SearchResultStory open={open}/><div className="metric-distinction"><span>Позиции<small>место запроса в выдаче</small></span><ArrowRight size={20}/><span>Визиты<small>посещения из поиска</small></span><ArrowRight size={20}/><span>Заявки<small>отдельная цель аналитики</small></span><ArrowRight size={20}/><span>Продажи<small>данные бизнеса</small></span></div><p className="vn-fine">Эти показатели связаны, но не взаимозаменяемы. На результат влияют состояние сайта, спрос и изменения поисковых систем.</p></section></div>

 <section className="seo-workflow paper-surface"><div className="container"><div className="editorial-heading"><h2>Не одно действие.<br/><span>Связанная работа.</span></h2><p>Что меняется на сайте<br/>и что остаётся у вас.</p></div><ol className="workflow-track">{workflow.map(([name,copy],i)=><li key={name}><button aria-pressed={stage===i} aria-controls="seo-workflow-output" onClick={()=>setStage(i)}><span>{i+1}</span><strong>{name}</strong><p>{copy}</p><ArrowRight size={21}/></button></li>)}</ol><div className="workflow-output" id="seo-workflow-output" aria-live="polite"><div><h3>{workflow[stage][2]}</h3><p className="seo-stage-caption">Результат этапа «{workflow[stage][0]}»</p></div><p>{workflow[stage][3]}</p></div></div></section>

 <div className="container"><section className="vn-section seo-scope"><div className="editorial-heading"><h2>Подключусь там,<br/><span>где нужен результат.</span></h2><p>Все 16 задач — в четырёх направлениях.<br/>Можно выбрать одну или связать несколько.</p></div>
 <div className="seo-group-picker" role="group" aria-label="Направления SEO-работ">{groups.map((g,index)=>{const count=inventory.filter(i=>i.group===g).length;return <button key={g} aria-pressed={group===g} aria-controls={`seo-group-${index}`} onClick={()=>{setGroup(g);setSelected(inventory.find(i=>i.group===g)!.id);}}><span>{g}</span><small>{count} {count===5?'задач':'задачи'}</small><ArrowRight size={18} aria-hidden="true"/></button>;})}</div>
 {groups.map((g,index)=><div key={g} id={`seo-group-${index}`} className="seo-group-panel" hidden={group!==g}>
  <div className="seo-task-picker" role="group" aria-label={`Задачи: ${g}`}>{inventory.filter(i=>i.group===g).map(i=><button key={i.id} aria-pressed={selected===i.id} aria-controls={`seo-task-${i.id}`} onClick={()=>setSelected(i.id)}>{i.name}<ArrowUpRight size={18} aria-hidden="true"/></button>)}</div>
  <div className="seo-task-output" aria-live="polite">{inventory.filter(i=>i.group===g).map(i=><div key={i.id} id={`seo-task-${i.id}`} hidden={selected!==i.id}><h3>{i.name}</h3><p className="seo-task-description">{i.shortDescription}</p><p className="seo-task-conditions">{i.capabilities[1]}</p><button className="vn-link" onClick={()=>open({kind:'contact',value:i.name})}>Обсудить эту задачу<ArrowUpRight size={18}/></button></div>)}</div>
 </div>)}
 <div className="seo-scope-close"><p>Не уверены, с чего начать? Пришлите сайт и опишите проблему — помогу определить первый шаг.</p><button className="vn-link" onClick={()=>open({kind:'contact',value:'SEO: определить приоритеты для сайта'})}>Определить приоритеты<ArrowUpRight size={18}/></button></div>
 </section>

 <section className="seo-formats"><h2>Можно начать<br/><span>с малого.</span></h2><div className="format-table">{[['Разовая задача','Аудит, техническая проверка или дооптимизация выбранных страниц.','Конкретный объём и понятный результат.'],['Работа по этапам','Исследование, структура, содержание и внедрение в согласованной последовательности.','Приоритеты, согласование и проверка каждого этапа.'],['Сопровождение','Наблюдение за позициями и визитами, доработки и развитие сайта.','План дальнейших изменений и отчёт по выполненной работе.']].map(([name,copy,out])=><div key={name}><h3>{name}</h3><p>{copy}</p><span>{out}</span></div>)}</div><p className="vn-fine">Состав, стоимость и условия оплаты согласую после оценки сайта. Фиксированных пакетов и обещаний ТОП здесь нет.</p></section>

 <div className="seo-ownership"><Check size={22} aria-hidden="true"/><p>Материалы и доступы остаются у вас. Инструменты аналитики по возможности подключаю на аккаунты клиента. Работу и приоритеты обсуждаете напрямую со мной.</p></div>

 <section className="seo-working-tools"><h2>Не догадки.<br/><span>Проверка и наблюдение.</span></h2><div>{seo.tools.map(t=><span key={t}>{t}</span>)}</div></section><section className="vn-section faq-section"><h2>До начала работы</h2><div className="vn-faq">{faq.map(([q,a])=><details key={q}><summary>{q}<Plus size={20}/></summary><p>{a}</p></details>)}</div></section><ContextCTA open={open} title="Посмотрим на ваш сайт?" context={seo.name} copy="Пришлите ссылку и расскажите, что сейчас не устраивает. Начнём с исходной ситуации."/></div></article>;
}
function ArrowDownIcon(){return <ArrowRight size={18} className="arrow-down"/>;}
