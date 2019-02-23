// Запуск
const config = require('./config.json');
const Discord = require('discord.js');
const vimeworld = require('vimelib');
const ciphersky = require('./ciphersky.js');
const self = new ciphersky();
const client = new Discord.Client();
const vime = new vimeworld(config.vimetoken || process.env.VIMETOKEN);

// Подключаем префикс
var prefix = '!';

// Вход
client.login(config.discordtoken || process.env.BOTTOKEN);

// Сообщение о готовности (вывод в консоль)
client.on('ready', () => {
    client.user.setGame(`!help // !info`);
    console.log('Ивент инициализирован. Подключён аккаунт ' + client.user.tag);
});

// Приход оповещения о добавлении/удалении бота
client.on('guildCreate', (g) => {
	client.channels.get("534042811503345695").send(`Новый сервер:\nИмя: ${g.name}\nID: ${g.id}`);
});

client.on('guildDelete', (g) => {
	client.channels.get("534042811503345695").send(`Удаление с сервера:\nИмя: ${g.name}\nID: ${g.id}`);
});

// Сообщения
client.on('message', async message => {
	const ayy = client.emojis.find("name", "error");
	if(message.content.indexOf(prefix) !== 0) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if(command === "help") {
	    	message.channel.send({embed: {
		  color: 3447003,
		  description: message.author + ', вам доступны следующие команды:```fix\nВыдача роли по рангу: !!verify (Примечание: для использования данной команды, напишите !!createverifyroles 10-15 раз)\nСписок друзей игрока: !friends [никнейм]\nПроверить, есть ли "в сети" персонал проекта: !staff\nПроверка активных стримов на сервере: !streams\nИнформация о боте: !info\nИнформация об игроке: !user [никнейм]\nИнформация о гильдии: !guild [имя]\nПроверка онлайна на сервере: !online\nШутки: !joke\nАватарка: !avatar [упоминание]\n```'
		}});
	}
	
	if(command === "info") {
	    	let infocmd = new Discord.RichEmbed()
			.setAuthor("sqdEclipse", "https://vladciphersky.xyz/772f67653137238069b16b9f53fae468.png")
			.setDescription("Информация о проекте Blood Project")
			.addField(`VimeWorld API || Токен`, `Валидный`)
			.addField(`Discord API || Токен`, `Валидный`)
			.addField(`Используемые библиотеки`, "```\ndiscord.js\nvimelib\n```")
			.addField(`Сервер тех. поддержки`, `https://invite.gg/bloodproject`);
		message.channel.send(infocmd);
		message.reply(`поддержите бота репутацией на форуме: https://forum.vimeworld.ru/topic/281793-blood-project/`);
	}
	
	if(command === "dev") {
  if(message.author.id === "178404926869733376") {
  if(!args[0] || args[0] === 'help') {
    message.channel.send(`DeveloperTools - Набор небольших инструментов для разработчика. \n\nКоманды:\n**eval** - выполнить строчку кода \n**shutdown** - отключить бота \n**cinvite [ID]** - создать инвайт`)
  }
  if(args[0] === 'eval') {
    try {
    var code = args.slice(1).join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.sendCode("xl", clean(evaled));
  } catch(err) {
    message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
  }
  if(args[0] === 'cinvite') {
	let guild = client.guilds.get(args[1]);
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
	if (channels.size > 0) channels.first().createInvite().then(inv => message.channel.send(`https://discord.gg/${inv.code}`))
  }
    if(args[0] === 'shutdown') {
      message.channel.send(":white_check_mark: Выполняю запрос..")
      setTimeout(() => {
        process.exit();
}, 500)
    }
  } else {
    message.channel.send({embed: {
  color: 1111111,
  title: "Ошибка:",
  description: ayy + ` У вас нету прав для доступа к этой команде.`
  }});
  }
}
	
	if(command === "staff") {
  vime.getStaff().then((player) => {
    var owners = "Персонал сервера онлайн: \n\n";
    player.forEach((staff) => {
        owners += `[${staff.rank}] ${staff.username} - ${staff.online.message}\n`
    })
    message.channel.send(owners);
})
}
	
	if(command === "streams") {
  vime.getStreams().then((streams) => {
    var owners = "Список активных стримов: \n\n";
    streams.forEach((stream) => {
        owners += stream.owner + " ведет прямую трансляцию: `" + stream.title + "`\nЗрителей: " + stream.viewers + "\n"
    })
    message.channel.send(owners);
})
}
	
	if(command === "guild") {
		if(!args[0] || args[0] === "") return message.channel.send("Вы неправильно ввели команду.\nСинтаксис: !" + command + " <тип запроса(name/tag/id)> <имя/тэг/айди>");
		if(args[0] === "name") {
			message.reply(`погоди. Если сообщение с инфой не пришло - значит гильдия отсутствует`);
		const guildName = args.slice(1).join(" ");
		if(!guildName) return message.reply(`Вы ввели неверное название гильдии\n\nПример: !guild name Fantastic Five | !guild name VimeTop`);
	vime.getGuildByName(guildName).then((guild) => {
    message.channel.send({embed: {
		title: `Статистика гильдии ${guild.name}`,
		description: `ID: ${guild.id}\nТэг: ${guild.tag}\nУровень: ${guild.level}\nКол-во коинов, вложенных в казну: ${guild.totalCoins}\n\nФункционал будет пополняться.`
	}
	});
	});
		}
		if(args[0] === "tag") {
			message.reply(`погоди. Если сообщение с инфой не пришло - значит гильдия отсутствует`);
		const guildName = args.slice(1).join(" ");
		if(!guildName) return message.reply(`Вы ввели неверный тэг гильдии\n\nПример: !guild tag F5 | !guild tag VTop`);
	vime.getGuildByTag(guildName).then((guild) => {
    message.channel.send({embed: {
		title: `Статистика гильдии ${guild.name}`,
		description: `ID: ${guild.id}\nТэг: ${guild.tag}\nУровень: ${guild.level}\nКол-во коинов, вложенных в казну: ${guild.totalCoins}\n\nФункционал будет пополняться.`
	}
	});
	});
		}
		if(args[0] === "id") {
			message.reply(`погоди. Если сообщение с инфой не пришло - значит гильдия отсутствует`);
		const guildName = args.slice(1).join(" ");
		if(!guildName) return message.reply(`Вы ввели неверный ID гильдии\n\nПример: !guild id 1 | !guild id 104`);
	vime.getGuildByID(guildName).then((guild) => {
    message.channel.send({embed: {
		title: `Статистика гильдии ${guild.name}`,
		description: `ID: ${guild.id}\nТэг: ${guild.tag}\nУровень: ${guild.level}\nКол-во коинов, вложенных в казну: ${guild.totalCoins}\n\nФункционал будет пополняться.`
	}
	});
	});
		}
	}
  
  if(command === "user") {
	  message.reply(`погоди. Если сообщение с инфой не пришло - значит юзер отсутствует`);
		const userName = args.join(" ");
	  if(!userName) return message.reply(`Вы ввели неверный никнейм игрока\n\nПример: !user Vlad_Cyphersky | !user DimoshaTyan | !user LoganFrench`);
	vime.getUsersbyName(userName).then((result) => { 
		var userID = result[0].id;
		var rnk = result[0].rank;
		var userN = result[0].username;
    	var userLVL = result[0].level;
	vime.getSession(userID).then((result) => { 
    var status = result.online.value ? "Онлайн | "+result.online.message : "Оффлайн";
    const embedLOL = new Discord.RichEmbed()
		.setTitle(`Статистика игрока ${userN}`)
		.setDescription(`ID: ${userID}\nРанг: ${rnk}\nУровень: ${userLVL}\nСтатус: ${status}\n\nФункционал будет пополняться.`)
		.setThumbnail("https://skin.vimeworld.ru/helm/" + userN + ".png");
message.channel.send(embedLOL);
	});
	});
	}
	
	if(command === "friends") {
		const userName = args.join(" ");
		vime.getUsersbyName(userName).then((result) => {
			var id = result[0].id;
            var nick = result[0].username;
            var rank = result[0].rank;
		vime.getSession(id).then((result) => {
    var status = result.online.value ? "Онлайн | "+result.online.message : "Оффлайн";
            vime.getFriends(id).then((result) => {
                var friends_list = "";
                result.friends.forEach(friend => {
                    friends_list += ("`LVL: " + friend.level + " " + vime.returnReadable(friend.rank).prefix + " " + friend.username) + " | " + status + "`\n";
                });
		    
		    return message.channel.send("Список друзей игрока `" + vime.returnReadable(rank).prefix + " " + nick + "`: \n\n" + friends_list).catch(err => {
					let embed = new Discord.RichEmbed().setDescription(ayy + ` ` + err + `\n\nЗа описанием ошибки, обратитесь на сервер тех. поддержки: **https://invite.gg/bloodproject**`);
					return message.reply(embed);
				});
            })
            })
        })
	}
	
	if(command === "online") {
	vime.getOnline().then((online) => {
    message.channel.send({embed: {
		title: "Онлайн на сервере VimeWorld.ru Minigames:",
		description: `Общий онлайн: ${online.total}\n\nОнлайн на Annihilation: ${online.separated.ann}\nОнлайн на BuildBattle: ${online.separated.bb}\nОнлайн на GunGame: ${online.separated.gg}\nОнлайн в Лобби: ${online.separated.lobby}\nОнлайн на SkyWars: ${online.separated.sw}\nОнлайн на BedWars: ${online.separated.bw}\nОнлайн на MobWars: ${online.separated.mw}\nОнлайн на KitPVP: ${online.separated.kpvp}\nОнлайн на DeathRun: ${online.separated.dr}\nОнлайн на BlockParty: ${online.separated.bp}\nОнлайн на HungerGames: ${online.separated.hg}`
	}
	});
});
	}
	
	if(command === "uptime") {
		const embed = new Discord.RichEmbed()
            .setTitle('**Статистика:**')
            .setThumbnail(client.user.avatarURL);
            embed.addField('Пинг:', client.ping);
            embed.addField('ОЗУ:', process.env.WEB_MEMORY + 'MB / ' + process.env.MEMORY_AVAILABLE + 'MB');
            embed.addField('Процесс:', process.env.DYNO);
            embed.addField('Порт:', process.env.PORT);
            message.channel.send(embed);
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
            return message.channel.send(`fail`);
		
            const embed = new Discord.RichEmbed()
                .setTitle(`Аватарка пользователя ${member.user.tag}`)
                .setImage(member.user.avatarURL)
                .setFooter(client.user.tag)
                .setDescription('Если изображение не загружается, тыкните на него (либо перезагрузите клиент Discord)');
            message.channel.send({embed});
}
});
