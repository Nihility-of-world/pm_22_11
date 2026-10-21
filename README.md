# Лабораторні роботи 2–3

Адаптивне англомовне резюме Noel Taylor, зверстане за макетом варіанта 11 на
Bootstrap 5. Сторінка поділена на окремі HTML-компоненти, а стилі кожного
розділу — на SCSS-модулі. SVG-іконки зберігаються окремими файлами у
`src/app/imgs/icon`.

Gulp збирає сторінку в `dist`, компілює стилі в `dist/css/index.min.css` і
копіює Bootstrap CSS та JavaScript до `dist`.

## Запуск

```sh
npm install
npx gulp
```

Після початкової збірки Gulp запускає локальний сервер BrowserSync на
`http://localhost:3000` і стежить за змінами в `src/app`.

## Структура SCSS

- `src/app/scss/main.scss` — головний файл, що підключає стилі сторінки;
- `_variables.scss` і `_mixins.scss` — змінні та міксіни;
- `_header.scss`, `_about.scss`, `_experience.scss`, `_skills.scss`,
  `_languages.scss`, `_hobbies.scss`, `_sidebar.scss`, `_contact.scss`,
  `_education.scss`, `_references.scss` — стилі окремих частин резюме.