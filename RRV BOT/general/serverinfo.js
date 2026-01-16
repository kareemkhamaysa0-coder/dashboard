const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('يعرض معلومات السيرفر'),

    async execute(interaction) {
        const guild = interaction.guild;
        interaction.reply(`**اسم السيرفر:** ${guild.name}\n**عدد الأعضاء:** ${guild.memberCount}\n**صاحب السيرفر:** ${guild.ownerId}`);
    }
};
