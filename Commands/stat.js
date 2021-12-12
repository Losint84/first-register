const { MessageEmbed, Client, Message } = require("discord.js");
const db = require("quick.db");
const Settings = require("../Settings/Settings.json");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  let cezarolu = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(cezarolu)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send("Bir üyeyi etiketlemelisin.")
  let embedx = new MessageEmbed()
  if (check === false) return message.channel.send(embedx.setDescription(`Kullanıcının Herhangi Bir Stats Bilgisi Yok.`).setColor(Settings.Colors.Blue).setTimeStamp)

  let kadınsayı = await db.get(`kayıt.${message.author.id}.kadın`)
  let erkeksayı = await db.get(`kayıt.${message.author.id}.erkek`)
  let toplam = await db.get(`kayıt.${message.author.id}.toplam`)

  const embed = new MessageEmbed()
  .setTitle(`[+] ${user.user.username} Yetkilisinin Stats Bilgisi [+]`)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Losint ♥ Development`)
  .setDescription(`• Toplam Kaydettiği Kişi: \`${toplam}\` \n• Toplam Kaydettiği Kadın: \`${kadınsayı || "0"}\` \n• Toplam Kaydettiği Erkek: \`${erkeksayı || "0"}\``, { code: 'yaml', split: true })
  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["stat", "stats"]
};

module.exports.help = {
  name: 'stat'
};