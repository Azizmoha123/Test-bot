require("dotenv").config();

const { Client, Collection, Partials, GatewayIntentBits, EmbedBuilder } = require('discord.js');

//mongoose
const Mongoose = require('mongoose');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember
    ],
    shards: "auto",
});






module.exports = client;
client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
['Commands', 'Events', 'SlashCommands'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
})

//nodejs-events
process.on("unhandledRejection", e => {
    console.log(e)
})
process.on("uncaughtException", e => {
    console.log(e)
})
process.on("uncaughtExceptionMonitor", e => {
    console.log(e)
})
//mongo connect
Mongoose.connect("mongodb").then(() => console.log('Datebase is connected')).catch((err) => console.log('Datebase Field to connected', err)) //// رابط المونڨو 


const line = "https://cdn.discordapp.com/attachments/1213228582126747759/1216251224869961869/gifFile_3.gif?ex=65ffb538&is=65ed4038&hm=ce3fc2045863099428ee6beaba3bc738db4be599e3042864aee37bc7e3d09f01&"; //رابط الخط

// تحديد معرفات الرومات

const channelIDs = ['1249832034076070021', '', '']; //رومات اللي يترسل فيها الخط

client.once('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('messageCreate', async message => {

    // تحقق ما إذا كانت الرسالة مرسلة من البوت لتجنب الرد على رسائله

    if (message.author.bot) return;

    // تحقق ما إذا كانت الرسالة في أحد الرومات المحددة

    if (channelIDs.includes(message.channel.id)) {

        message.channel.send({ content: `${line}` }); // إرسال الرسالة المحددة

    }

});


let autotax = ['1252953145445847071']; //ضريبة تلقائية 

client.on("messageCreate", message => {
  if (message.channel.type === "dm" ||
    message.author.bot) return

  if (autotax.includes(message.channel.id)) {

    var args = message.content.split(' ').slice(0).join(' ')
    if (!args) return;

    if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
    else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
    else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
    else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
    let args2 = parseInt(args)
    let tax = Math.floor(args2 * (20) / (19) + (1))
    let tax2 = Math.floor(args2 * (20) / (19) + (1) - (args2))
    let tax3 = Math.floor(tax2 * (20) / (19) + (1))
    let tax4 = Math.floor(tax2 + tax3 + args2);
    let tax5 = Math.floor((2.5 / 100) * args)
    let tax6 = Math.floor(tax4 + args2 * (20) / (19) + (1) - (args2));
    let tax7 = Math.floor(tax + tax5)
    let tax8 = Math.floor(tax4 + tax5)
    let tax9 = Math.floor((5 / 100) * args - args * -0)
    let tax10 = Math.floor(tax - args)
    let tax11 = Math.floor(tax9 + tax10)
    let tax12 = Math.floor(tax - tax11)


    let embed = new EmbedBuilder()



      .setThumbnail(message.guild.iconURL())
      .setFooter({
        text: message.guild.name,
          iconURL: message.guild.iconURL()
        })
      

      .addFields(
        {
          name: "> **السعر بدون ضرائب :**", value: `**\`${args}\`**`
        },
        {
          name: "> **السعر مع ضرائب :**", value: `**\`${tax}\`**`
        },
        {
          name: "> **ضرائب الوسيط بدون نسبة :**", value: `**\`${tax4}\`**`
        },
        {
          name: "> **ضرائب الوسيط مع نسبة :**", value: `**\`${tax6}\`**`
        },
        {
          name: "> **نسبة الوسيط :**", value: `**\`${tax9}\`**`
        },
        {
          name: "> **تحويل بدون ضرائب :**", value: `**\`${tax12}\`**`
        })

      .setTimestamp()
    
message.delete()
    message.channel.send({ embeds: [embed] }).catch((err) => {
      console.log(err.message)
    });
  }
});



client.login("MTI").catch((err) => { //التوكن هنا
    console.log(err.message)
})
