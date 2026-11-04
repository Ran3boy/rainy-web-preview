// Public destinations confirmed by the owner on 2026-11-03. No delivery credentials belong here.
const phoneDisplay = '+7 (951) 035-32-56';
const phoneHref = 'tel:+79510353256';
export const contacts = {
  telegramHandle: '@ran3boy',
  telegramUrl: 'https://t.me/ran3boy',
  whatsappUrl: 'https://wa.me/79510353256',
  maxUrl: 'https://max.ru/u/f9LHodD0cOKjjeO6PBg-iODraKVBLqs_7oa33K9BwExJAd2WE2H69YFM1K8',
  vkUrl: 'https://vk.ru/ran3boy',
  phoneDisplay,
  phoneInternational: '+79510353256',
  phoneHref,
  phoneLabel: phoneDisplay,
  phoneUrl: phoneHref,
} as const;

export const messengers = [
  {id:'telegram',name:'Telegram',url:contacts.telegramUrl,icon:'telegram.svg'},
  {id:'whatsapp',name:'WhatsApp',url:contacts.whatsappUrl,icon:'whatsapp.svg'},
  {id:'max',name:'MAX',url:contacts.maxUrl,icon:'max.svg'},
  {id:'vk',name:'ВКонтакте',url:contacts.vkUrl,icon:'vk.svg'},
] as const;

export function validPhone(value:string){
  const digits=value.replace(/\D/g,'');
  return /^[+\d\s().-]+$/.test(value.trim()) && digits.length>=7 && digits.length<=15;
}

export function composeInquiry(values:{name?:string;phone?:string;email?:string;service?:string;comment?:string;website?:string}){
  return ['Здравствуйте, Николай! Хочу обсудить проект.',values.service&&`Направление: ${values.service}`,values.website&&`Сайт / материалы: ${values.website}`,values.comment&&`Задача: ${values.comment}`,values.name&&`Имя: ${values.name}`,values.phone&&`Телефон: ${values.phone}`,values.email&&`Email: ${values.email}`].filter(Boolean).join('\n');
}
