const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('يكرر البوت الرسالة التي تكتبها')
        .addStringOption(option => option.setName('message').setDescription('الرسالة').setRequired(true)),

    async execute(interaction) {
        const message = interaction.options.getString('message');
        interaction.channel.send(message);
        interaction.reply({ content: 'تم إرسال الرسالة!', ephemeral: true });
    }
};
