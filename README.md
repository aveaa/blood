# Информация
- Blood Project. (или же Blood, Блуд) - Бот Discord, написанный на Фреймворке [NodeJS](https://nodejs.org) с использованием API проекта [VimeWorld.ru](https://vimeworld.ru).
- Пригласить бота: [https://discordapp.com/api/oauth2/authorize?client_id=529414897973592096&permissions=8&scope=bot](https://discordapp.com/api/oauth2/authorize?client_id=529414897973592096&permissions=8&scope=bot)
- Тема на форуме: [https://forum.vimeworld.ru/topic/281793-blood-project/](https://forum.vimeworld.ru/topic/281793-blood-project/)

## Умеет
- `!joke` - Шутить шутки.
- `!online` - Показывать кол-во онлайна на VimeWorld.ru.
- `!user` - Показывать информацию о игроке.
- `!guild` - Показывать информацию о гильдии.
- `!streams` - Показывать информацию о стримах.
- `!staff` - Показывать модеров онлайн.
- `!!verify` - Выдавать роль по рангу (Пример: [Модер] DimoshaTyan подходит для роли "[VW] Модератор").
Примечание: если хотите чтобы бот выдавал роли за ранг, пропишите `!!createverifyroles` 10-15 раз. Так нужно.

## Основные файлы репозитория
- `package.json` - Лучше не редактировать.
- `visual.js` - Мозг бота. Хотя нет, это сам бот.
- `Procfile` - Файл для версии на собственном хостинге. Не будет работать (если вы не кодер). [Взаимодействие с `visual.js`]
- `config.json` - Тупо говоря, настройки бота.
- `install.cmd` - Установщик модулей.
- `start.cmd` - Лаунчер для запуска.

## Установка
1. Отредактировать файл `config.json`
2. Запустить `install.cmd`
3. После закрытия `install.cmd,` запустите `start.cmd`

## Используемые библиотеки
- Discord.JS | npm i discord.js | [https://github.com/discordjs/discord.js](https://github.com/discordjs/discord.js)
- VimeLib | npm i vimelib | [https://github.com/asazs/VimeLib](https://github.com/asazs/VimeLib)
