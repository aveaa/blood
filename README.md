# Blood
Discord бот для гильдии [AquaLiquid](https://vk.com/aqua.liquid) с использованием API проекта [VimeWorld.ru](https://vimeworld.ru)

## Умеет
- `!joke` - Шутить шутки.
- `!online` - Показывать кол-во онлайна на VimeWorld.ru.
- `!user <nickname>` - Показывать информацию о игроке.
- `!guild <guildname>` - Показывать информацию о гильдии.
- `!moderator` - Модерировать.

## Основные файлы репозитория
- `main.js` - Мозг, который запускается через `start.cmd`
- `package.json` - Лучше не редачить.
- `visual.js` и `Procfile` - Файлы для версии на собственном хостинге. Не будет работать (если вы не кодер).
- `config.json` - Важная фигня для `main.js`
- `install-1.cmd` (discord.js) и `install-2.cmd` (vimelib) - Установщики модулей.

## Установка
1. Отредактировать файл `config.json`
2. Запустить сначала `install-1.cmd`, а затем `install-2.cmd`
2. Запустить бота с помощью `start.cmd`

## Используемые библиотеки
- Discord.JS | npm i --save discord.js | [https://github.com/discordjs/discord.js](https://github.com/discordjs/discord.js)
- VimeLib | npm i --save vimelib | [https://github.com/asazs/VimeLib](https://github.com/asazs/VimeLib)
