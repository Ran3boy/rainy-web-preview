# Rainy Web — interactive preview

Демонстрационный статический сайт, не production. React / TypeScript / Vite. Без сервера, базы данных, отправки форм и счётчиков аналитики.

## Запуск

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

GitHub Pages base: `/rainy-web-preview/`. Hash-маршруты работают при refresh и прямом открытии: `/#/services/`, `/#/cases/`, `/#/cases/pirr/`, `/#/cases/north-court/`.

## Обновление

Изменить код, проверить `npm test` и `npm run build`, затем `git add src public`, `git commit` и `git push origin main`. GitHub Actions автоматически собирает и публикует `dist` в GitHub Pages. Первоначальная настройка Pages: Source = GitHub Actions. Production-домены и Figma не изменяются.

## Границы демонстрации

- Контакты предоставлены владельцем: Telegram @ran3boy и телефон +7 (951) 035-32-56. «Обсудить проект» открывает выбор внешнего контакта, не отправляет данные через сайт. Email пока отключён. Контакты редактируются в `src/contacts.ts`. Юридические документы обозначены как неокончательные.
- Полные детальные страницы: PIRR и North Court. Другие разработки имеют только предоставленные сведения, Systelecom обозначен незавершённым. Volt Point показан в индексе кейсов; вымышленные детали не добавлены.
- В публичной демонстрации есть проверенные обезличенные оригинальные скриншоты North Court: Topvisor с запросами и датами и числовой фрагмент Метрики. Остальные отчёты не опубликованы; соответствующие кнопки отключены.
- GLB — предоставленная владельцем Liquid Nexus. Ленивый Three.js, ограниченный DPR и частота кадра, при reduced motion / saveData / ошибке WebGL используется утверждённый PNG.
- Выбор города хранится только локально. Он не означает физический офис.
- `noindex,nofollow` и robots.txt не делают сайт приватным.

Исходные скриншоты проектов и скульптура предоставлены владельцем Rainy Web; интерфейс не состоит из full-page PNG. Onest — Fontsource / SIL OFL; Three.js, React, React Router, Lucide — зависимости с собственными лицензиями. Внутренние Figma-файлы, документы, Excel, токены и необезличенные отчёты не входят в репозиторий.

Техническая основа: [GitHub Pages deployment в Vite](https://vite.dev/guide/static-deploy.html#github-pages), [HashRouter](https://reactrouter.com/api/declarative-routers/HashRouter).
