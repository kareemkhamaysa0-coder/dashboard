const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// إعدادات البوت (تستخدمها بالداشبورد)
client.welcomeMessage = "مرحباً بك في السيرفر!";
client.disabledCommands = [];
client.roleSettings = {};

// تحميل الأوامر
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.data.name, command);
  }
}

// تحميل الأحداث
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// تسجيل الدخول (من Environment Variables)
client.login(process.env.TOKEN);

module.exports = client;
