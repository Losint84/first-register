const { MessageEmbed, Message, Client } = require("discord.js");
const db = require("quick.db")
const Settings = require("../Settings/Settings.json")
const moment = require("moment")
module.exports.run = async (client, message, args) => {

  let cezarolu = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(cezarolu)) {
    return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));
  }

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send("Bir üyeyi etiketlemelisin.")
  let check = await db.has(`isimler.${user.id}`)
  if (check === false) return message.channel.send("Bu üyenin herhangi bir isim verisine ulaşamadım.")

  let fetch = await db.get(`isimler.${user.id}`)
  let isimler = fetch.length > 0 ? fetch.map((value, index) => `• No: **${index + 1}** \n• Yetkili: <@${value.Registerer}> \n• Adı: \`${Settings.ServerSettings.Tag} ${value.Name} | ${value.Age}\` \n• Verilen Roller: **${value.Rol}/${value.Rol2}**`).join(`\n\n`) : "Bu Üyenin Geçmiş İsmi Bulunmamakta.";

  const embed = new MessageEmbed()
  .setTitle(`"${user.user.username}" Üyesinin Önceki İsimleri`)
  .setDescription(`${isimler}`, { code: 'yaml', split: true })
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Losint ♥ Development`)
  message.channel.send(embed)


}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isimler", "eski-isimler"]
};

module.exports.help = {
  name: 'isimler'
};