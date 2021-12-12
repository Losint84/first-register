const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const Settings = require('../Settings/Settings.json')
const Other = require('../Settings/Other.json')
exports.run = async (client, message, args) => {  
let teyit = await db.get(`kayıt`) || 0;

  let data = Object.keys(teyit);
  let dataTop = data.filter(x => message.guild.members.cache.has(x)).sort((a, b) => Number((teyit[b].erkek || 0) + (teyit[b].kadın || 0)) - Number((teyit[a].erkek) + (teyit[a].kadın))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} Adlı Üyenin Toplam **${(teyit[value].erkek || 0) + (teyit[value].kadın || 0)}** Kaydı Var. (\`${teyit[value].erkek || 0}\` erkek, \`${teyit[value].kadın || 0}\` kadın)`).splice(0, 20).join("\n");

  let embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(dataTop || "Herhangi bir kayıt verisi bulamadım.")
    .setColor(Settings.Colors.Magenta)
    .setTimestamp()

  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["top-teyit", "top", "topteyit"]
};

module.exports.help = {
  name: 'topteyit'
};