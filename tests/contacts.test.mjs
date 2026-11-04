import test from 'node:test';
import assert from 'node:assert/strict';
import {contacts,messengers,validPhone,composeInquiry} from '../src/contacts.ts';

test('all messenger destinations configured once, without visitor query data',()=>{
 assert.equal(messengers.length,4);assert.equal(new Set(messengers.map(m=>m.url)).size,4);
 for(const m of messengers){const url=new URL(m.url);assert.equal(url.protocol,'https:');assert.equal(url.search,'');assert.equal(url.hash,'');}
 assert.equal(contacts.phoneInternational,'+79510353256');assert.equal(contacts.phoneHref,`tel:${contacts.phoneInternational}`);
});
test('phone validation accepts international formatting and rejects invalid contact data',()=>{
 for(const phone of ['+7 (951) 035-32-56','+44 20 7946 0958','+1-202-555-0100','020 7946 0958','1234567'])assert.equal(validPhone(phone),true,phone);
 for(const phone of ['','+','12345','+1234567890123456','позвоните завтра','+7 abc 9510353256','79510353256@example.com'])assert.equal(validPhone(phone),false,phone);
});
test('inquiry composer preserves service context and optional fields as plain text',()=>{
 const text=composeInquiry({service:'SEO-аудит сайта',phone:'+44 20 7946 0958',comment:'Нужна проверка страниц',name:'Анна'});
 assert.match(text,/SEO-аудит сайта/);assert.match(text,/Телефон: \+44 20 7946 0958/);assert.match(text,/Имя: Анна/);assert.doesNotMatch(text,/undefined|Email:|https:\/\//);
 assert.equal(composeInquiry({}),'Здравствуйте, Николай! Хочу обсудить проект.');
});
