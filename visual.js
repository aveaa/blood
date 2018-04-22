// Запуск
const Discord = require('discord.js');
const client = new Discord.Client();

// Подключаем токен и префикс
var token = process.env.BOTTOKEN
var prefix = '!';

// Подключаемся
client.login(token);

// Приветствуем людей
client.on('guildMemberAdd', async message => {
	client.channels.get("435798157251706880").send(`Возьмите с собой ${message.user.tag} на турнир`);
});

// Сообщение о готовности (вывод в консоль)
client.on('ready', () => {
    // Статус "не беспокоить"
    client.user.setStatus('dnd');
    // Смотрит на Француза
	client.user.setPresence({
				game: {
					name: `на Француза | !about`,
					type: 3
				}
});
    // Вывод текста "что бот готов" + токен бота в консоль
    console.log('Ивент инициализирован. Подключён аккаунт ' + client.user.tag);
    console.log('Токен: ' + token)
});

// Сообщения
client.on('message', async message => {
    // Если сообщение отправил бот, молчим
    if(message.author.bot) return;
    
    if(message.content === prefix + "about") {
    	message.channel.send("```fix\nШутки: !joke\nАватарка: !avatar [упоминание]\nКоманды модератора: !moderator\nАвторские права: !license\n```");
    }
    
    if(message.content.indexOf(prefix) !== 0) return;
   
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
	
	if(command === "license") {
		message.author.send(`Использование этого кода в полной мере или частично позволяется только на некоммерческих основаниях после разрешения автора.\nДля связи с автором можете использовать данные реквизиты:\nDiscord: **Eclipse#5372**\nEMail: **contact@eclipsedev.cf**\n\nБот настроен специально для сервера гильдии Andromeda в Discord.\nСсылка-приглашение на сервер: **https://discord.gg/6Xr6fNK**\nИсходный код: **https://github.com/thedipperproduction/andromeda**\n\nCopyright 2018 © Eclipse Studio. Все права защищены.\nНарушение авторских прав преследуется законом.\n\nCC-BY-NC-SA:\n**http://creativecommons.org/licenses/by-nc-sa/4.0**`);
		message.reply(`проверьте свои личные сообщения.`);
	}
	
	if(command === "eval") {
    if(message.author.id !== "178404926869733376") return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
	
	if(command === "joke") {
  	let items = ['Падает комп с виндой с 16-го этажа и думает: Вот сейчас бы зависнуть',
        'Ты кто по гороскопу?\n- Рыба\n- А я пиво',
        'Вчера отвёл душу... Сегодня не могу вспомнить куда!?..',
        'Если вы нашли ошибку в тексте бота, выделите её мышкой и нажмите Alt+F4',
        'У кошки четыpе ноги: вход, выход, земля и питание',
        'Я, я свидетель! А что случилось?',
        'Что же вы так убиваетесь? Вы же так никогда не убьётесь!',
        'Ты умрешь, а я нет',
        'В начале о главном. Главный — в порядке.',
        'Мы не продаём алкоголь и сигареты лицам, не достигшим ничего',
        'Не пугайтесь, это только усугубит положение',
        'Я добрый, просто я людей ненавижу',
        'Сшил дырки — получилась сетка',
        'Мир несовершенен',
        'Фонарик на солнечной батарее',
        'Колобок повесился',
        'Буратино утонул',
        'Лечу от вирусов по фотографии вашего компьютера',
        'Засолим огурцы по самые помидоры!',
        'Если болт нужно забить аккуратно, его вкручивают',
        'Искусство — это не ЧТО, а КАК',
        'Оптимизм — это недостаток информации',
        'Если ласточки ползают по земле и блюют — это к концу света',
        'Вратарь ловко овладел мячом. Мяч придётся заменить.',
        'Выйди из комы и зайди как полагается!',
        'Смотри, как он трогательно спит, совсем как дохлый',
        'А это — человек. Сейчас он будет пытаться изменить свою жизнь. Смотрите, как он забавно надеется на лучшее.',
        'Реестр запрещённых сайтов попал в реестр запрещённых сайтов, поскольку содержит информацию о запрещённых сайтах.',
        '"Нужно пораньше в магазин приехать, чтобы мало народа было, и быстро всё купить, и в очередях не стоять", — подумал весь город.',
        '— Вам понятно как работает фрезер или объяснить на пальцах?',
        'Чтобы выделятся из серой массы необязательно красить волосы в красный цвет и носить кольцо в носу. Достаточно просто не быть говном.',
        'По мнению Госдепа и ЕС, эти русские совсем обнаглели: плюнешь в морду — драться лезут.',
        'Когда поёт Тимати замолкают даже соловьи, потому что даже они не могут петь и блевать одновременно.',
        'Меня мучает один вопрос: в связи с чем эти ледяные штуки называются «сосульки», а карамельные конфетки — «леденцы»? Почему не наоборот?',
        'Вдруг откуда ни возьмись, ниоткуда не взялось.',
        'Я начал с нуля, а затем многократно приумножил свои знания.',
        'Навязчивость — худшее из качеств, вы со мной согласны? Давайте обсудим? Почему не хотите? Может, я к вам на колени сяду?',
        'Приняли хорошо. Выгнали не сразу, били без злости, да и догоняли лениво.',
        'Бесит, когда люди идут нахуй недостаточно быстро.',
        '— А ты давно кактус на холодильнике поливала?\n— Это хлеб.',
        'Медведь проживший с цыганами 10 лет, не впадал в спячу, чтобы у него ничего не спиздили.',
        'Учитель рисования просто обожал свой предмет. Поэтому на каждом уроке дети рисовали его предмет.',
        'Сегодня видел объявление «Продам принтер», написанное от руки. Что-то здесь не так.',
        'Жопа велосипедиста, въехавшего в рекламный щит, 17 минут была лицом компании AVON.',
        'В Молдавии за второго ребёнка правительство выделяет мешок цемента. Но потратить его можно только на образование',
        'Как объяснить соседям, что лифт и так наш, поэтому метить его не надо?',
        '— Здравствуй, Дедушка Мороз, борода из ваты! Ты подарки нам принёс?\n— Нет, идите нахуй.',
        'Вчера во дворе хулиганы избили оптимиста Василия до полужизни.',
        'Трёхлетний малыш, слепивший прямоугольный песочный \'куличик\', неожиданно для себя нарушил 15 патентов Apple.',
        'Родился сам — помоги другому',
        'Мне, конечно, нравятся дети, но целого я бы не съел',
        'Больной, просыпайтесь! Пора принимать снотворное!',
        'Я иногда так нерешителен. Или нет?',
        'Самки пенопласта откладывают яйца в коробки из-под бытовой техники',
        'Если труп обвести цветными мелками — будет атмосфера праздника!',
        'Серая неплодородная почва из пяти букв? Бетон.',
        'Труп врага всегда хорошо пахнет',
        '— Пап, это кальян. Через него нельзя гнать самогон.',
        'Добро - это когда плохому человеку делаешь плохо',
        'Если вопрос правильно поставить, он может долго простоять.',
        'Мальчик, не до конца завязавший шнурки, не до конца сошёл с эскалатора',
        'Сколько в людях ни разочаровывайся — всё равно удивят',
        'А файл с заявлением на увольнение назывался ПНХ.doc',
        'Начни с себя и на себе остановись',
        'Планшеты от Микрософт — самые лучшие планшеты среди планшетов от Микрософт!',
        'Ну и запросы у вас — сказала база данных и повисла',
        'Пишу про всех гадости',
        'Судя по вашим охуевшим лицам, вы слегка удивлены',
        'Человек может всё, пока не начнёт что-то делать',
        'Ёж — птица гордая, пока не пнёшь — не полетит',
        'Люди, считающие, что деньги могут всё — сами могут сделать всё за деньги',
        'Кpасота сосёт мир',
        'Жизнь одна — проеби её ярко!',
        'Не всякий лось перекусит рельсу',
        'Как-то раз один мальчик пошёл за водкой. Вниз по социальной лестнице.',
        'Пингвины — это растолстевшие ласточки',
        'Если у вас нет Интернета, то у кого-то их два',
        'Выдавил из себя раба — убери за собой!',
        'Одни с годами умнеют, другие становятся старше',
        'Лифт не работает. Ближайший лифт — в соседнем доме.',
        'Кролики думали, что они трахаются, а на самом деле их разводили',
        'В слове «гребля» первые две буквы означают «грyппoвая»',
        'Добро пожаловать отсюда',
        'Пойдём со мной. Ты пожалеешь, но тебе понравится',
        'Кто с чем к нам придёт, тот без того и останется',
        'Ваш раздел D:\\ перепорнен.',
        'В тебе сидит говно, но ты называешь это характером',
        'Если в кране нет воды — значит это подъёмный кран',
        'Мисс Таиланд на хую вертела все обвинения в свой адрес',
        'Набирая песок для новой кошки, маленький Петя нашел старую',
        'Сын борца сумо всю жизнь мечтал обнять отца',
        'Жить на белом свете — не политкорректно',
        'С улицы пришёл кусок грязи, утверждает, что мой ребёнок',
'Табличка с надписью «Осторожно! Убьёт!» осторожно убила человека'];
    let item = items[Math.floor(Math.random()*items.length)];
    message.channel.send(item);
}
	
	if(command === "avatar") {
		let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({error});
            const embed = new Discord.RichEmbed()
                .setTitle(`Аватарка пользователя ${member.user.tag}`)
                .setImage(member.user.avatarURL)
                .setFooter(client.user.tag)
                .setDescription('Если изображение не загружается, тыкните на него (либо перезагрузите клиент Discord)');
            message.channel.send({embed});
}
    
    if(command === "moderator") {
    let err = false;
['MANAGE_MESSAGES'].forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
            }
        });
if (err) return message.reply("у вас нету разрешения для управления сообщениями (MANAGE_MESSAGES).");
        message.author.send({embed: {
    color: 2378990,
    fields: [{
        name: "!kick [@упоминание] [причина]",
        value: "Кикнуть пользователя"
      },
      {
        name: "!ban [@упоминание] [причина]",
        value: "Забанить пользователя"
      },
      {
        name: "!chgasschat [@упоминание] [причина]",
        value: "Сменить доступ к чату для пользователя"
      }
    ]
  }
});
        message.reply(
      'проверьте свои личные сообщения'
    );
}
 
  if(command === "kick") {
    let err = false;
['KICK_MEMBERS'].forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
            }
        });
if (err) return message.reply("у вас нету разрешения кикать участников (KICK_MEMBERS).");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("вы не сказали кого кикнуть");
    if(!member.kickable) 
      return message.reply("я не могу кикнуть его(её), у меня есть хоть права?");
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("а причину написать?");
    await member.kick(reason)
      .catch(error => message.reply(`Прости, я не могу кикнуть: ${error}`));
    message.channel.send({embed: {
    color: 3447003,
    fields: [{
        name: "• = Команда выполнена = •",
        value: `${member.user.tag} был кикнут по причине: "${reason}"`
      }
    ]
  }
});
}
    
    if(command === "chgasschat") {
	    let err = false;
['MANAGE_MESSAGES'].forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
            }
        });
if (err) return message.reply("у вас нету разрешения для управления сообщениями (MANAGE_MESSAGES).");
		let reason = args.slice(1).join(' ');
  		let member = message.mentions.members.first();
  		let muteRole = message.guild.roles.find('name', 'Muted');;
  		if (!muteRole) return message.reply('Я не могу найти роль Muted').catch(console.error);
  		if (reason.length < 1) return message.reply('причина, -__-').catch(console.error);
  		if (message.mentions.users.size < 1) return message.reply('упоминание, -__-').catch(console.error);
  		const embed = new Discord.RichEmbed()
    		.setColor(0x00AE86)
    		.setTimestamp()
    		.setDescription(`**Действие:** Мут/Размут\n**Нарушитель:** ${member.user.tag}\n**Модератор:** ${message.author.tag}\n**Причина:** ${reason}`);

  		if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('У меня нету прав MANAGE_ROLES').catch(console.error);

  		if (member.roles.has(muteRole.id)) {
    		member.removeRole(muteRole).then(() => {
      		message.channel.send({embed}).catch(console.error);
    		})
    		.catch(e=>console.error("Невозможно размутить: " + e));
  		} else {
   	 		member.addRole(muteRole).then(() => {
      		message.channel.send({embed}).catch(console.error);
    		})
    		.catch(e=>console.error("Невозможно выдать мут: " + e));
  		}
}
 
  if(command === "ban") {
    let err = false;
['BAN_MEMBERS'].forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
            }
        });
if (err) return message.reply("у вас нету разрешения банить участников (BAN_MEMBERS).");
     
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("вы не сказали кого забанить");
    if(!member.bannable) 
      return message.reply("я не могу забанить его(её), у меня есть хоть права?");
 
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("а причину написать?");
     
    await member.ban(reason)
      .catch(error => message.reply(`прости, я не могу забанить: ${error}`));
    message.channel.send({embed: {
    color: 3447003,
    fields: [{
        name: "• = Команда выполнена = •",
        value: `${member.user.tag} был забанен по причине "${reason}"`
      }
    ]
  }
});
}
 
  if(command === "eval") {
        if (message.author.id !== "178404926869733376") return message.channel.send({embed: {
  color: 3447003,
  description: "`Вы не разработчик бота. Чтобы получить доступ к этой команде, обратитесь к <@178404926869733376>`"
}});
    try {
      var code = args.join(" ");
      var evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.sendCode("xl", clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
}
    }
});
