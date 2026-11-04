import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,Code2,Search,Check,KeyRound} from 'lucide-react';
import {Breadcrumbs} from './StructurePages';
import {ContextCTA} from './VNextShared';
import {asset} from './data';
import type {Open} from './ui';

type Track='dev'|'seo';
const chapters=[
 {id:'process-start',range:'1–2',name:'Начало'},
 {id:'process-solution',range:'3–4',name:'Решение'},
 {id:'process-check',range:'5–6',name:'Проверка'},
 {id:'process-handover',range:'7–8',name:'Передача'},
];
const stages=[
 {title:'Обсуждаем задачу',dev:'Что должен делать сайт, для кого он создаётся и какие материалы уже есть. Уточняю цель и ожидания.',seo:'Что происходит с сайтом сейчас, какие страницы и показатели важны бизнесу. Уточняю цель и ожидания.',client:'Вы рассказываете о бизнесе. Я задаю вопросы.'},
 {title:'Изучаю проект',dev:'Проверяю содержание, существующий сайт, платформу и необходимые интеграции. Уточняю ограничения.',seo:'Изучаю доступную аналитику, индексацию и исходное состояние приоритетных страниц. Уточняю ограничения.',client:'Вы предоставляете нужные материалы и доступы.'},
 {title:'Собираю план',dev:'Фиксирую структуру страниц, путь посетителя и функциональные требования. Оценку обсуждаем до реализации.',seo:'Определяю приоритеты и план изменений. Семантика и новая структура — если входят в согласованный объём.',client:'Вы согласуете объём, этапы, условия и критерии проверки.'},
 {title:'Готовлю решения',dev:'Показываю интерфейс в Figma или Pixso. Согласуем композицию и содержание до основной разработки.',seo:'Готовлю рекомендации, содержание и требования к изменениям страниц до основного внедрения.',client:'Вы смотрите подготовленное решение и даёте обратную связь.'},
 {title:'Реализую',dev:'Собираю frontend и адаптивный интерфейс на выбранной платформе. Изменение объёма обсуждаю отдельно.',seo:'Внедряю мета-теги, содержание и технические изменения по согласованному плану и в пределах доступов.',client:'Вы видите изменения и можете задать вопрос напрямую.'},
 {title:'Проверяю',dev:'Проверяю адаптивность, формы, ссылки и навигацию. Устраняю найденные проблемы до передачи.',seo:'Проверяю корректность внедрения и доступность страниц. Фиксирую исходные точки наблюдения.',client:'Вы принимаете работу по согласованным критериям.'},
 {title:'Запускаю и передаю',dev:'Публикую сайт, передаю материалы и доступы. Объясняю, где что находится и как работать с результатом.',seo:'Передаю перечень изменений и отчёт. Объясняю, какие данные и за какой период нужно наблюдать.',client:'Вы получаете результат, материалы и доступы.'},
 {title:'Обсуждаем развитие',dev:'Новые страницы, доработки и техническая поддержка — при необходимости. Дальнейший объём согласуем отдельно.',seo:'Наблюдение за позициями и визитами, уточнение приоритетов и следующие изменения — по отдельной договорённости.',client:'Вы решаете, нужно ли продолжать сотрудничество.'},
];
const checks={
 dev:[
  ['Посетитель открывает сайт с телефона','Содержание читается, навигация доступна, важные действия помещаются на экране.'],
  ['Переходит к услуге и примеру работы','Ссылки ведут на нужные страницы; путь к контакту остаётся понятным.'],
  ['Заполняет форму, если она входит в проект','Поля, ошибки и подтверждение проверяются вместе с согласованной доставкой обращения.'],
 ],
 seo:[
  ['Открывается изменённая страница','Страница доступна, переходы и технические настройки соответствуют задаче.'],
  ['Проверяется содержание страницы','Заголовки, мета-теги и текст внедрены в согласованном виде.'],
  ['Сравниваются данные после внедрения','У каждого показателя есть источник и период. Визиты не подменяют заявки или продажи.'],
 ],
};

function Stage({index,track}:{index:number;track:Track}){
 const s=stages[index];
 return <div className="pn-stage" id={`stage-${index+1}`}><h3><span className="pn-stage-number">{index+1}</span>{s.title}</h3><p>{s[track]}</p><p className="pn-client">{s.client}</p></div>;
}

function StructureArtifact(){
 return <figure className="pn-structure"><figcaption><strong>Структура Rainy Web</strong><span>Пример на этом сайте</span></figcaption><div className="pn-tree"><div className="pn-tree-root">Главная<span>/</span></div><div className="pn-tree-branches"><div>Услуги<span>/services/</span><div className="pn-tree-leaf">Разработка<span>/services/development/</span></div><div className="pn-tree-leaf">SEO<span>/services/seo/</span></div></div><div>Кейсы<span>/cases/</span><div className="pn-tree-leaf">PIRR<span>/cases/pirr/</span></div><div className="pn-tree-leaf">North Court<span>/cases/north-court/</span></div></div><div>Контакты<span>/contacts/</span></div></div></div><p>Связи между страницами помогают пройти от задачи к примеру и контакту. Структуру вашего проекта определяем отдельно.</p></figure>;
}

export function ProcessNext({open}:{open:Open}){
 const[track,setTrack]=useState<Track>('dev');
 const[current,setCurrent]=useState(0);
 const content=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const nodes=content.current?.querySelectorAll('[data-process-chapter]');
  if(!nodes||!('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(entries=>{
   const hit=entries.find(e=>e.isIntersecting);
   if(hit)setCurrent(Number(hit.target.getAttribute('data-process-chapter')));
  },{rootMargin:'-16% 0px -58% 0px'});
  nodes.forEach(node=>observer.observe(node));
  return()=>observer.disconnect();
 },[]);
 return <article className="v-next process-next pn-editorial">
  <div className="container"><Breadcrumbs label="Как я работаю"/>
   <header className="pn-intro"><h1>Понятно.<br/><span>На каждом этапе.</span></h1><div><p>От первого разговора до проекта, которым управляете вы. Показываю решения, согласую объём и передаю результат лично.</p><div className="pn-track" role="group" aria-label="Формат работы"><button aria-pressed={track==='dev'} onClick={()=>setTrack('dev')}><Code2 size={18} aria-hidden="true"/>Разработка</button><button aria-pressed={track==='seo'} onClick={()=>setTrack('seo')}><Search size={18} aria-hidden="true"/>SEO</button></div><p className="pn-track-note" aria-live="polite">{track==='dev'?'От структуры и интерфейса к работающему сайту.':'От исходного состояния к проверенным изменениям.'}</p></div></header>
  </div>
  <nav className="pn-progress" aria-label="Путь проекта"><div className="container">{chapters.map((c,i)=><a key={c.id} href={`#${c.id}`} aria-current={current===i?'step':undefined} onClick={()=>setCurrent(i)}><span>{c.range}</span>{c.name}<ArrowRight size={16} aria-hidden="true"/></a>)}</div></nav>
  <div ref={content}>
   <section id="process-start" data-process-chapter="0" className="pn-chapter pn-start"><div className="container pn-start-layout">
    <div className="pn-start-copy"><h2>Сначала —<br/><span>понять задачу.</span></h2><div className="pn-stage-pair"><Stage index={0} track={track}/><Stage index={1} track={track}/></div></div>
    <div className="pn-brief"><h3>С чем начнём разговор</h3><dl><div><dt>Задача</dt><dd>{track==='dev'?'Что сайт должен помочь сделать посетителю?':'Какие страницы и показатели важны вашему бизнесу?'}</dd></div><div><dt>Что уже есть</dt><dd>{track==='dev'?'Текущий сайт, тексты, изображения, фирменные материалы.':'Адрес сайта, история изменений, доступные отчёты и аналитика.'}</dd></div><div><dt>Ограничения</dt><dd>{track==='dev'?'Платформа, интеграции и возможность обновлять содержание.':'Платформа, доступы и возможность внедрять изменения.'}</dd></div></dl><div className="pn-brief-close"><ArrowRight size={22} aria-hidden="true"/><p>Из разговора появляется<br/><strong>согласованная задача.</strong></p></div><button className="vn-link" onClick={()=>open({kind:'contact',value:track==='dev'?'Разработка сайтов':'SEO-продвижение сайтов'})}>Рассказать о проекте<ArrowUpRight size={18}/></button></div>
   </div></section>

   <section id="process-solution" data-process-chapter="1" className="pn-chapter pn-solution paper-surface"><div className="container">
    <div className="pn-chapter-heading"><h2>Решение видно<br/><span>до внедрения.</span></h2><p>Сначала согласуем, что и зачем меняется. Вы можете оценить направление и внести обратную связь до основной работы.</p></div>
    <div className="pn-solution-layout"><div className="pn-solution-stages"><Stage index={2} track={track}/><Stage index={3} track={track}/><p className="pn-agreement"><Check size={18} aria-hidden="true"/>План, объём и критерии проверки — до реализации.</p></div>
     <div className="pn-solution-artifact">{track==='dev'?<figure className="pn-interface"><Link to="/cases/pirr/" aria-label="Посмотреть кейс разработки PIRR"><img src={asset('pirr-home.png')} alt="Реальный интерфейс PIRR: фотография объекта, описание компании и навигация" loading="lazy" width="2047" height="1036"/><span className="pn-image-action"><ArrowUpRight size={21} aria-hidden="true"/></span></Link><figcaption><strong>PIRR · реальный интерфейс</strong><p>Пример работы с композицией и содержанием. Решение вашего проекта согласуем отдельно.</p><Link className="vn-link" to="/cases/pirr/">Посмотреть кейс<ArrowUpRight size={17}/></Link></figcaption></figure>:<StructureArtifact/>}</div>
    </div>
   </div></section>

   <section id="process-check" data-process-chapter="2" className="pn-chapter pn-check"><div className="container">
    <div className="pn-chapter-heading"><h2>Собрать.<br/><span>Проверить в деле.</span></h2><p>Готовность определяется согласованными сценариями. Показываю изменения и устраняю найденные проблемы.</p></div>
    <div className="pn-build-flow" aria-label="От реализации к приёмке"><span>Реализация</span><ArrowRight aria-hidden="true"/><span>Проверка</span><ArrowRight aria-hidden="true"/><span>Приёмка</span></div>
    <div className="pn-check-layout"><div className="pn-check-stages"><Stage index={4} track={track}/><Stage index={5} track={track}/></div>
     <div className="pn-scenarios"><h3>{track==='dev'?'Проверяю путь посетителя':'Проверяю внедрение и данные'}</h3><p>Примеры критериев, которые уточняем под вашу задачу.</p><dl>{checks[track].map(([scenario,expectation])=><div key={scenario}><dt>{scenario}</dt><dd>{expectation}</dd></div>)}</dl><p className="pn-scenario-note">{track==='dev'?'Состав проверки зависит от функциональности и платформы проекта.':'Позиции, заявки и продажи не гарантируются. Источники и периоды сравнения рассматриваются отдельно.'}</p></div>
    </div>
   </div></section>

   <section id="process-handover" data-process-chapter="3" className="pn-chapter pn-handover paper-surface"><div className="container">
    <div className="pn-handover-heading"><h2>Ваш проект.<br/><span>Под вашим контролем.</span></h2><KeyRound size={42} strokeWidth={1.25} aria-hidden="true"/></div>
    <div className="pn-handover-layout"><div className="pn-handover-stages"><Stage index={6} track={track}/><Stage index={7} track={track}/></div><div className="pn-ownership"><h3>Что остаётся у вас</h3><dl><div><dt>{track==='dev'?'Материалы проекта':'Перечень изменений и отчёт'}</dt><dd>{track==='dev'?'Передаю созданные материалы и объясняю структуру проекта.':'Передаю выполненные работы, источники данных и ограничения выводов.'}</dd></div><div><dt>Доступы и аккаунты</dt><dd>{track==='dev'?'Не удерживаю проект на своих аккаунтах без необходимости. Материалы и доступы остаются у клиента.':'Метрика, Вебмастер и Search Console — по возможности на ваших аккаунтах. Материалы и доступы остаются у клиента.'}</dd></div><div><dt>Решение о продолжении</dt><dd>Сопровождение не навязывается. Следующие задачи и условия согласуются отдельно.</dd></div></dl><Link className="vn-link" to="/about/">Кто отвечает за работу<ArrowUpRight size={18}/></Link></div></div>
   </div></section>
  </div>
  <div className="container"><ContextCTA open={open} context={track==='dev'?'Разработка сайтов':'SEO-продвижение сайтов'} title="Начнём с первого разговора." copy="Расскажите о проекте. Я уточню задачу и предложу следующий шаг."/></div>
 </article>;
}
