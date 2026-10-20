export function inspectSnippet(title, description) {
  const length = [...title.trim()].length;
  return {
    length,
    empty: length === 0,
    titleNote: length === 0 ? 'Добавьте заголовок страницы.' : length > 65 ? 'Заголовок длинный: часть текста может быть обрезана.' : 'Короткий и понятный заголовок. Проверьте, отражает ли он задачу страницы.',
    descriptionNote: !description.trim() ? 'Добавьте описание: чем страница полезна посетителю?' : 'В выдаче поисковик может показать другое описание.',
  };
}
