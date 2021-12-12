const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const Settings = require('../Settings/Settings.json')
const Other = require('../Settings/Other.json')
exports.run = async (client, message, args) => {
  
  let redembed = new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic:true})).setFooter("Losint ♥ Development").setTimestamp().setColor(Settings.Colors.Red)

if(![(Settings.Roles.Registerer)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send((redembed.setDescription(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`))) 

if (message.channel.id !== Settings.Channels.RegisterChat) return message.channel.send((redembed.setDescription(`Burası Kayıt Kanalı Değil, Lütfen <#${Settings.Channels.RegisterChat}> Kanalında Deneyiniz.`)))

const sıra = await db.fetch('case')
const emoji = Other.EmojiGeneral.Onayla
const chat = message.guild.channels.cache.find(r => r.id === (Settings.Channels.GeneralChat)) 

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let name = args[1]
  let age = args[2]

  if (!user) return message.channel.send((redembed.setDescription(`Kayıt Etmek İstediğin Üyeyi Etiketlemelisin.`)))
  if (!name) return message.channel.send((redembed.setDescription(`Kayıt Etmek İstediğin Üye'nin İsmini Yazmalısın.`)))
  if (!age) return message.channel.send((redembed.setDescription(`Kayıt Etmek İstediğin Üye'nin Yaşını Yazmalısın.`)))
  if (age < `${Settings.ServerSettings.ServerAge}`) return message.channel.send((redembed.setDescription(`Kayıt Ettiğin Üyenin Yaşı ${Settings.ServerSettings.ServerAge}'ten Küçük Olamaz.`)))

if (user.user.tag.includes(Settings.ServerSettings.Tag)) {user.setNickname(`${Settings.ServerSettings.Tag} ${name} | ${age}`)} else {user.setNickname(`${Settings.ServerSettings.UnTag} ${name} | ${age}`)}
user.roles.add(Settings.Roles.BoyRole1)
user.roles.add(Settings.Roles.BoyRole2)
user.roles.remove(Settings.Roles.Unregister)

await db.push(`isimler.${user.id}`, {
    Registerer: message.author.id,
    Name: name,
    Age: age,
    Rol: `<@&${Settings.Roles.BoyRole1}>`,
    Rol2: `<@&${Settings.Roles.BoyRole2}>`
  })

  db.add(`kayıt.${message.author.id}.toplam`, +1)
  db.add(`kayıt.${message.author.id}.erkek`, +1)
  db.add('case', 1)
  if(sıra === null) sıra = "1"
  let toplam = await db.get(`kayıt.${message.author.id}.toplam`)
  let erkek = await db.get(`kayıt.${message.author.id}.erkek`)

  let x = await db.get(`isimler.${user.id}`)
  let isimler = x.length > 1 ? x.map((value, index) => `**${index + 1})** \`${value.Name} | ${value.Age}\` (${value.Rol}/${value.Rol2})`).join(`\n`) : "Bu Kullanıcının Önceden Bulunan Bir İsmi Yok.";
  let embed = new MessageEmbed()
    .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
    .setColor(Settings.Colors.Green)
    .setDescription(`• ${user}, <@${message.author.id}> Tarafından Kaydedildi.
    • ${user} Kişisinin Adı \`${name} | ${age}\` Olarak Değiştirildi.
    • <@&${Settings.Roles.BoyRole1}>, <@&${Settings.Roles.BoyRole2}> Başarıyla Verildi.
    • Kayıt Sırası: **#${sıra}**
    
    • ${user} Kullanıcısının Önceki İsimleri:
${isimler}
`)
.setFooter(`${message.author.username} Yetkilisinin Toplam ${toplam} Kaydı Oldu.`)
.setTimestamp()
message.channel.send(embed)
message.react(emoji)

const dmlog = new MessageEmbed()
.setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
.setDescription(`• ${user} Tebrikler, \`${message.guild.name}\` Sunucusunda \`Erkek\` Olarak Kaydedildin.
• İsmin \`${name} | ${age}\` Olarak Değiştirildi.`)
.setFooter(`Eğer Kaydında Bir Yanlışlık Varsa Yetkililere Bildir Lütfen.`)
.setColor(Settings.Colors.Blue)
user.send(dmlog)
  
  const chatembed = new MessageEmbed()
.setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
.setDescription(`${user} Aramıza Hoşgeldin Dostum, Keyifli Vakitler Geçirmeni Dileriz.`)
.setTimestamp()
.setFooter(Settings.ServerSettings.ServerName)
.setColor(Settings.Colors.Blue)
chat.send(chatembed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek", "e", "man", "boy"],
    permLevel: 0
};

exports.help = {
    name: "erkek"
}