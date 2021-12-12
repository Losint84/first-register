const { MessageEmbed } = require('discord.js');
const Settings = require("../Settings/Settings.json")

exports.run = async (client, message, args) => {
if(![(Settings.Roles.Registerer)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  let embedx = new MessageEmbed()
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(embedx.setDescription(`Bir Üye Etiketlemelisin.`).setFooter(Settings.ServerSettings.ServerName).setTimestamp().setColor(Settings.Colors.Magenta))

user.setNickname(`${Settings.Welcome.WelcomeName}`)
user.roles.add(Settings.Roles.Unregister);
user.roles.cache.forEach(r => {
user.roles.remove(r.id)
})
  let embed = new MessageEmbed()
  message.channel.send(embed.setDescription(`${user} Adlı Kullanıcı Başarıyla Kayıtsız'a Atıldı.`).setTimestamp().setColor(Settings.Colors.Blue).setFooter(Settings.ServerSettings.ServerName))
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız"]
};

module.exports.help = {
  name: 'kayıtsız'
};