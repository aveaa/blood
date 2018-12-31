# Информация
- Blood Project. (или же Blood, Блуд) - Бот Discord, написанный на Фреймворке [NodeJS](https://nodejs.org) с использованием API проекта [VimeWorld.ru](https://vimeworld.ru).
- Пригласить бота: [https://discordapp.com/api/oauth2/authorize?client_id=529414897973592096&permissions=8&scope=bot](:thinking:) <- Нажми :з

## Умеет
- `!joke` - Шутить шутки.
- `!online` - Показывать кол-во онлайна на VimeWorld.ru.
- `!user <nickname>` - Показывать информацию о игроке.
- `!guild <guildname>` - Показывать информацию о гильдии.
- `!streams` - Показывать информацию о стримах.
- `!staff` - Показывать модеров онлайн.
- `!moderator` - Модерировать ваш Discord сервер.

## Основные файлы репозитория
- `main.js` - Мозг, который запускается через `start.cmd`
- `package.json` - Лучше не редактировать.
- `visual.js` и `Procfile` - Файлы для версии на собственном хостинге. Не будет работать (если вы не кодер).
- `config.json` - Важная фигня для `main.js`
- `install.cmd` - Установщик модулей..
- `start.cmd` - Запускатор бота.

## Установка
1. Отредактировать файл `config.json`
2. Запустить `install.cmd`
3. После закрытия `install.cmd,` запустите `start.cmd`

## Используемые библиотеки
- Discord.JS | npm i discord.js | [https://github.com/discordjs/discord.js](https://github.com/discordjs/discord.js)
- VimeLib | npm i vimelib | [https://github.com/asazs/VimeLib](https://github.com/asazs/VimeLib)
