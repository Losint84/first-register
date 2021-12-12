const Discord = require('discord.js');//
const client = new Discord.Client();//
const Settings = require('./Settings/Settings.json');//
const Other = require('./Settings/Other.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./Util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = Settings.BotSettings.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./Commands/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} Adet Komut Yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./Commands/${f}`);//
        log(`[+] Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./Commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === Settings.BotSettings.Owner) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(Settings.BotSettings.token);

//-----------------------------------------------Komutlar------------------------------------------------\\
client.on("guildMemberAdd", async (member) => {
    member.roles.add(Settings.Roles.Unregister)
    member.setNickname(Settings.Welcome.WelcomeName)
    });
    
    
    
    
    client.on("ready", async () => {
      let botVoiceChannel = client.channels.cache.get(Settings.BotSettings.botVoiceChannelID);
      if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot Ses Kanalına Bağlanamıyor."));
    });
    
    
    
    
    client.on("guildMemberAdd", member => {  
      const kanal = member.guild.channels.cache.find(r => r.id === Settings.Welcome.WelcomeChat);
      const register = `<@&${Settings.Roles.Registerer}>`
      let los = client.users.cache.get(member.id);
      require("moment-duration-format");
        const kurulus = new Date().getTime() - los.createdAt.getTime();  
     
          var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
              '0': Other.EmojiNumbers.Zero,
              '1': Other.EmojiNumbers.One,
              '2': Other.EmojiNumbers.Two,
              '3': Other.EmojiNumbers.Three,
              '4': Other.EmojiNumbers.Four,
              '5': Other.EmojiNumbers.Five,
              '6': Other.EmojiNumbers.Six,
              '7': Other.EmojiNumbers.Seven,
              '8': Other.EmojiNumbers.Eight,
              '9': Other.EmojiNumbers.Nine}[d];
            })
          }
    
      var kontrol;
    if (kurulus < 1296000000) kontrol = `Hesap Durumu: Güvenilir Değil ${Other.EmojiGeneral.Reddet}`
    if (kurulus > 1296000000) kontrol = `Hesap Durumu: Güvenilir ${Other.EmojiGeneral.Onayla}`
      moment.locale("tr");
      const kuruluss = new Date().getTime() - los.createdAt.getTime();  
      const gecen = moment.duration(kuruluss).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Sunucumuza Hoşgeldin`, member.user.avatarURL({dynamic: true}))
  .setDescription(`**${Other.EmojiGeneral.Emoji1} ${Settings.ServerSettings.ServerName}'ye Hoşgeldin <@${los.id}> !\n\n${Other.EmojiGeneral.Emoji2} Seninle Beraber Sunucumuz `  + üyesayısı +  ` Kişiye Ulaştı !\n\n${Other.EmojiGeneral.Emoji3} ` + kontrol + `\n\n${Other.EmojiGeneral.Emoji4} Hesabın \``+ gecen +`\` Önce Oluşturulmuş.\n\n${Other.EmojiGeneral.Emoji5} <@&${Settings.Roles.Registerer}> Rolündeki yetkililer seninle ilgilenecektir.\n\n${Other.EmojiGeneral.Emoji6} Kaydını tamamlamak için herhangi bir \`Confirmation\` odalarından birine girmen yeterlidir.\n\n${Other.EmojiGeneral.Emoji7} Tagımızı alarak \`${Settings.ServerSettings.Tag}\` ailemizin bir parçası olabilirsin.**`)
  .setColor("RANDOM")
  kanal.send(register)
  kanal.send(embed)
      
  //------------------------------------------------------------------------------------------------------------------------------------\\
    
    client.on("guildMemberAdd", member => {
        var moment = require("moment")
        require("moment-duration-format")
        moment.locale("tr")
         var {Permissions} = require('discord.js');
         var x = moment(member.user.createdAt).add(7, 'days').fromNow()
         var user = member.user
         x = x.replace("birkaç saniye önce", " ")
         if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
         const kytsz = Settings.Roles.Unregister
         var rol = Settings.Roles.Suspicious
         var jail = Settings.Roles.Jail
         var kayıtsız = kytsz
         member.roles.add(rol)
         member.roles.remove(kytsz)
         let embed = new Discord.MessageEmbed().setColor(Settings.Colors.Red).SetTitle(user.user.username, user.user.avatarURL({dynamic: true})).setFooter("Losint ♥ Development")
    
      user.send(embed.setDescription(`Selam Dostum !\n Hesabın Son **1** Hafta İçinde Açıldığı İçin Cezalıya Düştün.\n Cezalı'dan Çıkmak İçin **Üst** Yetkiliyle İletişime Geçebilirsin.`))
      setTimeout(() => {
      
      }, 1000)
      
      
         }
              else {
      
              }
          });
    
    //------------------------------------------------------------------------------------------------------------------------------------\\
    
    
    //-----------------------TAG-ROL----------------------\\     
    
    client.on("userUpdate", async (losxstg, yeni) => {
      var sunucu = client.guilds.cache.get(Settings.ServerSettings.ServerID); 
      var uye = sunucu.members.cache.get(yeni.id);
      var tag = (Settings.ServerSettings.Tag); 
      var tagrol = (Settings.Roles.TagRole); 
      var logKanali = (Settings.Channels.TagLog); 
    
      if (!sunucu.members.cache.has(yeni.id) || yeni.bot || losxstg.username === yeni.username) return;
      
      if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
        try {
          await uye.roles.add(tagrol);
          await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
          await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor(Settings.Colors.Green).setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
        } catch (err) { console.error(err) };
      };
      
      if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
        try {
          await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
          await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
          await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor(Settings.Colors.Red).setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
        } catch(err) { console.error(err) };
      };
    });
    //-----------------------TAG-ROL----------------------\\   
    
    //----------------------TAG-KONTROL----------------------\\     
    
    client.on("guildMemberAdd", member => {
      let sunucuid = (Settings.ServerSettings.ServerID); 
      let tag = (Settings.ServerSettings.Tag);
      let rol = (Settings.Roles.TagRole); 
    if(member.user.username.includes(tag)){
    member.roles.add(rol)
      const tagalma = new Discord.MessageEmbed()
          .setColor(Settings.Colors.Green)
          .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
          .setTimestamp()
         client.channels.cache.get(Settings.Channels.TagLog).send(tagalma)
    }
    })
    
    //-----------------------TAG-KONTROL----------------------\\  
    
    client.on('message', msg => {
      if (msg.content === 'tag') {
        msg.channel.send(Settings.ServerSettings.Tag);
      }
    });
  
  });