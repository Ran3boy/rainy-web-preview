# Rainy Web 2.0 — canonical website preview

Демонстрационный статический сайт, не production. React / TypeScript / Vite. Без сервера, базы данных, отправки форм и счётчиков аналитики.

## Запуск

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Единственное приложение — эта папка `website-preview`. Главная `/` использует выбранный interactive-first-stage дизайн; отдельного приложения `experience` и переключателя концепций нет.

GitHub Pages base: `/rainy-web-preview/`. BrowserRouter и сгенерированные статические точки входа поддерживают refresh и прямое открытие `/`, `/services/`, `/cases/`, `/cases/pirr/`, `/cases/north-court/`. Старые `#/…` ссылки преобразуются однократно. Публичный preview: https://ran3boy.github.io/rainy-web-preview/.

## Обновление

Изменить код, проверить `npm test` и `npm run build`, проверить изменённые файлы перед commit и push в `main`. Существующий GitHub Actions собирает и публикует только `dist`. Production-домены не используются. Актуальные desktop/mobile экраны синхронизированы в существующем Figma-файле; backup v10 находится на отдельной архивной странице.

Компоненты: `Home.tsx` — новая главная; `Sculpture.tsx` — GLB; `ServiceDemos.tsx` — пять рабочих демо; `pages.tsx` — внутренние страницы; `layout.tsx` и `Dialogs.tsx` — общие навигация, подвал и viewer. Одни токены и стили в `styles.css`. `scripts/static-routes.mjs` формирует документы прямых маршрутов после сборки.

Восстановление: Git tag `v10-before-main-integration-2026-10-19` и bundle в проектном `design-assets/`; старые отдельные реализации и A/B/C убраны в `archive/rainy-pre-main-integration-2026-10-19/` вне публичного репозитория. Исторические review-экспорты не являются действующим сайтом.

## Границы демонстрации

- Контакты предоставлены владельцем: Telegram @ran3boy и телефон +7 (951) 035-32-56. «Обсудить проект» ведёт к общей контактной секции; запрос отдельной услуги открывает выбор контакта. Данные через сайт не отправляются. Email пока отключён. Контакты редактируются в `src/contacts.ts`. Юридические документы обозначены как неокончательные.
- Полные детальные страницы: PIRR и North Court. Другие разработки имеют только предоставленные сведения, Systelecom обозначен незавершённым. Volt Point показан в индексе кейсов; вымышленные детали не добавлены.
- В публичной демонстрации есть проверенные обезличенные оригинальные скриншоты North Court: Topvisor с запросами и датами и числовой фрагмент Метрики. Остальные отчёты не опубликованы; соответствующие кнопки отключены.
- GLB — предоставленная владельцем Liquid Nexus. Ленивый Three.js, ограниченный DPR и частота кадра, при reduced motion / saveData / ошибке WebGL используется утверждённый PNG.
- Выбор города хранится только локально. Он не означает физический офис.
- `noindex,nofollow` и robots.txt не делают сайт приватным.

Исходные скриншоты проектов и скульптура предоставлены владельцем Rainy Web; интерфейс не состоит из full-page PNG. Onest — Fontsource / SIL OFL; Three.js, React, React Router, Lucide — зависимости с собственными лицензиями. Внутренние Figma-файлы, документы, Excel, токены и необезличенные отчёты не входят в репозиторий.

Техническая основа: [GitHub Pages deployment в Vite](https://vite.dev/guide/static-deploy.html#github-pages), [BrowserRouter](https://reactrouter.com/api/declarative-routers/BrowserRouter). Это client-rendered preview с `noindex`, не production SEO/SSR-реализация. Перед production: финальные правовые документы, email, backend форм/защита, согласованная аналитика, реальные Core Web Vitals и оптимизация GLB/Three.js, SEO/SSR и sitemap/canonical для выбранного production-домена.
