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
    // Играет в Куличики
    client.user.setGame('Minecraft');
    // Вывод текста "что бот готов" + токен бота в консоль
    console.log('Ивент инициализирован. Подключён аккаунт ' + client.user.tag);
    console.log('Токен: ' + token)
});

// Сообщения
client.on('message', async message => {
    // Если сообщение отправил бот, молчим
    if(message.author.bot) return;
    
    if(message.content === prefix + "about") {
    	message.channel.send(`Команды модератора: ${prefix}moderator\nИсходный код: https://github.com/thedipperproduction/visual`);
    }
    
    if(message.content.indexOf(prefix) !== 0) return;
   
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    
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
        name: "!kick [@упоминание] [причина] - кикнуть пользователя",
        value: "Кикнуть пользователя"
      },
      {
        name: "!ban [@упоминание] [причина] - забанить пользователя",
        value: "Забанить пользователя"
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
