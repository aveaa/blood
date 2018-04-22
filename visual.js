// Запуск
const Discord = require('discord.js');
const client = new Discord.Client();

// Подключаем токен и префикс
var token = process.env.BOTTOKEN
var prefix = '!';

// Подключаемся
client.login(token);

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
    	message.channel.send(`Аватарка: ${prefix}avatar [упоминание]\nКоманды модератора: ${prefix}moderator\nИсходный код: https://github.com/thedipperproduction/visual`);
    }
    
    if(message.content.indexOf(prefix) !== 0) return;
   
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
	
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
      },
      {
        name: "!setmod [@упоминание]",
        value: "Поставить/снять пользователя на пост модератора"
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
	
	if(command === "setmod") {
	    let err = false;
['ADMINISTRATOR'].forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
            }
        });
if (err) return message.reply("у вас нету прав администратора.");
		let reason = args.slice(1).join(' ');
  		let member = message.mentions.members.first();
  		let muteRole = message.guild.roles.find('name', 'Moder (Офицер гильдии)');;
  		if (!muteRole) return message.reply('Я не могу найти роль Moder (Офицер гильдии)').catch(console.error);
  		if (message.mentions.users.size < 1) return message.reply('упоминание, -__-').catch(console.error);
  		const embed = new Discord.RichEmbed()
    		.setColor(0x00AE86)
    		.setTimestamp()
    		.setDescription(`**Действие:** Установка на пост модератора\n**Упомянутый:** ${member.user.tag}\n**Поставил:** ${message.author.tag}`);

  		if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('У меня нету прав MANAGE_ROLES').catch(console.error);

  		if (member.roles.has(muteRole.id)) {
    		member.removeRole(muteRole).then(() => {
   	 		member.addRole(muteRole).then(() => {
      		message.channel.send({embed}).catch(console.error);
    		})
    		.catch(e=>console.error("Невозможно выдать роль: " + e));
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
