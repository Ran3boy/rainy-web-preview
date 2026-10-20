import {useState} from 'react';
import {ArrowUpRight, Check, Code2, MapPin, Search, ChevronRight, Braces, FileText, Monitor, Smartphone, Plus, Minus} from 'lucide-react';
import {inspectSnippet} from './seo.mjs';

export const services=[
  {id:'development',name:'Разработка',line:'Из идеи — в работающий интерфейс.',body:'Структура, дизайн и код решают одну задачу. Посмотрите, как меняется одна и та же страница.',result:'На выходе: адаптивный сайт, понятная структура и доступы у вас.'},
  {id:'seo',name:'SEO',line:'Поиск начинается со смысла.',body:'Не только позиции. Сначала — страница, которая отвечает на запрос. Попробуйте собрать её поисковое представление.',result:'На выходе: приоритеты, техническая база и развитие нужных страниц.'},
  {id:'aeo',name:'GEO / AEO',line:'Факты, которые можно понять.',body:'Убираю неоднозначность в описании бизнеса: кто вы, что делаете, где работаете и чем подтверждается информация.',result:'На выходе: доступные, связанные факты. Без обещаний попадания в ответы ИИ.'},
  {id:'pf',name:'Поведенческие факторы',line:'Сначала — наблюдать. Потом — решать.',body:'Запросы, посадочные страницы и динамика позиций — в одном контексте. Откройте запрос, чтобы увидеть предмет проверки.',result:'ПФ и мониторинг обсуждаются отдельно. Манипуляции выдачей несут риски санкций; безопасный рост не гарантируется.'},
  {id:'local',name:'Геосервисы',line:'Бизнес, который легко найти.',body:'Карточка помогает принять решение ещё до перехода на сайт. Проверьте, какие сведения клиенту нужны в первую очередь.',result:'На выходе: оформленная карточка в Яндекс Бизнесе, Картах или 2ГИС.'},
] as const;
export type ServiceId=typeof services[number]['id'];

function DevelopmentDemo(){
  const [phase,setPhase]=useState<'structure'|'design'|'code'>('design');
  return <div className="development-demo">
    <div className="demo-toolbar"><span>Одна страница. Три слоя.</span><div className="segmented" aria-label="Слой демонстрационной страницы">{(['structure','design','code'] as const).map((p,i)=><button key={p} aria-pressed={p===phase} onClick={()=>setPhase(p)}>{['Структура','Дизайн','Код'][i]}</button>)}</div></div>
    {phase==='code'?<div className="code-example"><Code2 size={28}/><pre><code>{'<main>\n  <h1>Меньше шума.\n      Больше смысла.</h1>\n  <a href="#collection">\n    Смотреть коллекцию\n  </a>\n</main>'}</code></pre><p>Семантическая структура остаётся под визуальным слоем.</p></div>:<div className={`sample-site ${phase}`}>
      <div className="sample-nav"><b>forma</b><span>Предметы для жизни</span><ArrowUpRight size={18}/></div>
      <div className="sample-body"><div><h4>Меньше шума.<br/>Больше смысла.</h4><p>Продуманные предметы.<br/>Ничего лишнего.</p><span className="sample-link">Смотреть коллекцию <ArrowUpRight size={16}/></span></div><div className="sample-object" aria-hidden="true"><div/><div/><div/></div></div>
      <div className="sample-bottom"><span>Форма следует за смыслом.</span><span>Новая коллекция</span></div>
    </div>}
    <p className="demo-disclaimer">Вымышленный учебный пример, не клиентский проект. Элементы внутри макета иллюстрируют дизайн.</p>
  </div>;
}

export function SnippetDemo(){
  const [title,setTitle]=useState('Сайты с характером — дизайн и разработка | Rainy Web');
  const [description,setDescription]=useState('От структуры и дизайна до запуска и SEO. Прямая работа со специалистом. Все материалы и доступы остаются у вас.');
  const [mobile,setMobile]=useState(false);
  const analysis=inspectSnippet(title,description);
  return <div className="snippet-demo">
    <div className="demo-toolbar"><span><Search size={16}/> Ваш будущий сниппет</span><div className="segmented"><button aria-label="Сниппет: компьютер" aria-pressed={!mobile} onClick={()=>setMobile(false)}><Monitor size={17}/></button><button aria-label="Сниппет: телефон" aria-pressed={mobile} onClick={()=>setMobile(true)}><Smartphone size={17}/></button></div></div>
    <div className={`search-preview ${mobile?'mobile-preview':''}`}><div className="search-domain"><span className="search-avatar">R</span><div>Rainy Web<small>example.com › services</small></div></div><div className="search-title">{title.trim()||'Заголовок страницы'}</div><p>{description.trim()||'Здесь появится описание страницы.'}</p></div>
    <div className="snippet-fields"><label>Заголовок страницы <span>{analysis.length} знаков</span><input value={title} maxLength={180} onChange={e=>setTitle(e.target.value)}/></label><label>Описание страницы<textarea rows={3} value={description} maxLength={450} onChange={e=>setDescription(e.target.value)}/></label></div>
    <div className="snippet-feedback" role="status"><p>{analysis.titleNote}</p><p>{analysis.descriptionNote}</p></div>
    <p className="demo-disclaimer">Локальное демо, не аудит сайта и не реальная выдача. Длина — ориентир: отображение зависит от ширины, запроса и поисковой системы. Данные никуда не отправляются.</p>
  </div>;
}

function AeoDemo(){
  const [open,setOpen]=useState('service');
  const facts=[{id:'service',label:'Что делаете',value:'Разработка сайтов и SEO',explain:'Услуга названа прямо. Ей соответствует отдельная содержательная страница, а не только текст на картинке.',icon:Braces},{id:'author',label:'Кто отвечает',value:'Николай Иванов · Rainy Web',explain:'Автор, профиль компетенций и доступные контакты связывают сведения с конкретным человеком.',icon:FileText},{id:'region',label:'Где работаете',value:'Удалённо по России',explain:'Область работы не равна адресу офиса. Выбор города не создаёт несуществующее представительство.',icon:MapPin}];
  return <div className="aeo-demo"><div className="demo-toolbar"><span>От утверждения — к источнику</span><Braces size={20}/></div><div className="facts-document"><span className="document-label">Факты о Rainy Web</span>{facts.map(f=><button key={f.id} aria-expanded={open===f.id} onClick={()=>setOpen(open===f.id?'':f.id)}><f.icon size={20}/><span><small>{f.label}</small><strong>{f.value}</strong>{open===f.id&&<p>{f.explain}</p>}</span>{open===f.id?<Minus size={18}/>:<Plus size={18}/>}</button>)}</div><p className="aeo-output"><Check size={18}/> Факты доступны текстом и связаны по смыслу.</p><p className="demo-disclaimer">Это пример структуры фактов, не сгенерированный ответ ИИ. Цитирование и видимость в AI-поиске не гарантируются.</p></div>;
}

function PfDemo(){
  const [selected,setSelected]=useState(0);
  const rows=[['разработка сайта услуг','/services/development/','Проверить соответствие запросу и содержание страницы.'],['seo-аудит сайта','/services/seo/','Отделить аудит от продвижения, проверить поисковое намерение.'],['оформление яндекс бизнеса','/services/maps/','Проверить локальный контекст, контакты и состав услуги.']];
  return <div className="pf-demo"><div className="demo-toolbar"><span>Запрос → страница → действие</span><Search size={19}/></div><div className="query-table"><div className="query-head"><span>Учебный список запросов</span><span>Открыть</span></div>{rows.map((r,i)=><button key={r[0]} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span>{r[0]}<small>{r[1]}</small></span><ChevronRight size={20}/></button>)}</div><div className="query-action"><h4>{rows[selected][2]}</h4><span>Предмет проверки</span><p>Фиксируем дату, регион, устройство и поисковую систему. Изменение позиции само по себе не доказывает причину.</p></div><p className="demo-disclaimer">Вымышленные запросы и URL для демонстрации. Здесь нет выдуманных позиций или имитации клиентского отчёта. Это мониторинговая часть направления ПФ, не его переименование в UX-аудит.</p></div>;
}

function LocalDemo(){
  const [fields,setFields]=useState(['address']);
  const entries=[['address','Адрес и как добраться'],['hours','Часы работы'],['contact','Контакт для записи']];
  const toggle=(id:string)=>setFields(a=>a.includes(id)?a.filter(x=>x!==id):[...a,id]);
  return <div className="local-demo"><div className="demo-toolbar"><span>Соберите полезную карточку</span><MapPin size={20}/></div><div className="local-workspace"><div className="local-map" aria-hidden="true"><span className="map-park"/><span className="map-road"/><span className="map-pin"><MapPin size={26}/></span><span className="map-label">Условная схема</span></div><div className="business-profile"><h4>Мастерская N</h4><small>Вымышленный бизнес</small><p>Ремонт и обслуживание</p>{fields.includes('address')&&<span><MapPin size={16}/> Адрес и маршрут указаны</span>}{fields.includes('hours')&&<span><Check size={16}/> Время работы указано</span>}{fields.includes('contact')&&<span><Check size={16}/> Способ записи указан</span>}</div></div><fieldset className="local-fields"><legend>Какие сведения показать?</legend>{entries.map(([id,label])=><label key={id}><input type="checkbox" checked={fields.includes(id)} onChange={()=>toggle(id)}/>{label}</label>)}</fieldset><p className="demo-disclaimer">Учебная карточка, не карта действующего бизнеса. Полнота сведений помогает пользователю, но не гарантирует место в выдаче.</p></div>;
}

export default function ServiceDemos({active}:{active:ServiceId}) {
  return <div className="demo-content" key={active}>{active==='development'?<DevelopmentDemo/>:active==='seo'?<SnippetDemo/>:active==='aeo'?<AeoDemo/>:active==='pf'?<PfDemo/>:<LocalDemo/>}</div>;
}
