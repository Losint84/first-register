const { MessageEmbed, Client, Message } = require("discord.js");
const Settings = require("../Settings/Settings.json")
const Other = require('../Settings/Other.json')
module.exports.run = async (client, message, args) => {

  let cezarolu = Settings.Roles.Registerer
  let redembed = new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic:true})).setFooter("Losint ♥ Development").setTimestamp().setColor(Settings.Colors.Red)
  if(![(Settings.Roles.Registerer)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send((redembed.setDescription(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`)))

  if (message.channel.id !== Settings.Channels.RegisterChat) return message.channel.send(`Burası bir kayıt kanalı değil. Kayıt kanalı: <#${Settings.Channels.RegisterChat}>`)
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let name = args[1]
  let age = args[2]

  if (!user) return message.channel.send((redembed.setDescription(`Kayıt Etmek İstediğin Üyeyi Etiketlemelisin.`)))
  if (!name) return message.channel.send((redembed.setDescription(`Kayıt Etmek İstediğin Üye'nin İsmini Yazmalısın.`)))
  if (!age) return message.channel.send((redembed.setDescription(`Kayıt Etmek İstediğin Üye'nin Yaşını Yazmalısın.`)))
  if (age < `${Settings.ServerSettings.ServerAge}`) return message.channel.send((redembed.setDescription(`Kayıt Ettiğin Üyenin Yaşı ${Settings.ServerSettings.ServerAge}'ten Küçük Olamaz.`)))

  if (user.user.tag.includes(Settings.ServerSettings.Tag)) {user.setNickname(`${Settings.ServerSettings.Tag} ${name} | ${age}`)} else {user.setNickname(`${Settings.ServerSettings.UnTag} ${name} | ${age}`)}

  const emoji = Other.EmojiGeneral.Onayla
  const embed = new MessageEmbed()
  .setAuthor(user.user.username, user.user.avatarURL({dynamic:true}))
  .setDescription(`Başarıyla ${user} üyesinin ismi (${name} | ${age}) olarak değiştirildi.`)
  .setColor(Settings.Colors.Green)
  .setTimestamp()
.setFooter("Losint ♥ Development")
  message.channel.send(embed)
  message.react(emoji)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim", "i"]
};

module.exports.help = {
  name: 'isim'
};