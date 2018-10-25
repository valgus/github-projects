Проект, выполненный на основе [Create React App](https://github.com/facebook/create-react-app).

## Содержание

- [Описание](#описание)
- [Организация проекта](#организация-проекта)
- [Библиотеки](#библиотеки)
- [Graph QL](#graph-ql)
- [Запуск](#запуск)
  

## Описание

Выведение списка JS проектов на GitHub, созданных за последний месяц, фильтрация по лицензиям, названию проекта.

## Организация проекта

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      App.js
      Filter.js
      License.js
      Projects.js
      PRow.js
      PTable.js
      Search.js
    styles/
      App.css
      index.css
    test/
    utils/
      gql.js
      helper.js
```
`components/PTable.js` - компонент, отвечающий за отрисовку списка проектов, представляющий из себя таблицу, где каждая строка - `componentsPRow.js`
`components/Filter.js` - компонент, отвечающий за отрисовку списка лицензий, где каждая лицензия - `components/License.js`
`components/Search.js` - компонент, представляющий строку поиска проектов по имени

`components/Projects.js` - компонент, агрегирующий описанные выше компоненты
`utils/gql.js` - файл, содержащий запросы к Graph QL


## Библиотеки

[React Apollo client](https://www.apollographql.com/docs/react/) используется для получения данных о проекте с сайта GitHub.
К Apollo Client также подключена возможность кэширования запросов при помощи библиотеки [apollo-cache-inmemory](https://www.npmjs.com/package/apollo-cache-inmemory). 

[CSS Framework Bulma](https://bulma.io/) используется для стилизации проекта. 

В данном проекте не задействованы библиотеки, такие как Redux/Flux, позволяющие хранить состояние приложения в отдельном хранилище, так как приложение имеет небольшое дерево компонентов.


## Graph QL

Graph QL используется для получения следующий данных:
- получение всех возможных лицензий
- получение следующих 10 проектов после переданного в запрос курсора
- получение предыдущих 10 проектов перед переданным в запрос курсором

## Запуск

Для запуска приложения необходимо иметь ACCESS TOKEN для доступа к данным GitHub:
```

set "REACT_APP_GITHUB_TOKEN=${your ACCESS TOKEN}" && npm start

```
