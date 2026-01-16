const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('يعرض صورة البروفايل لعضو')
        .addUserOption(option => option.setName('target').setDescription('العضو').setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        interaction.reply({ content: `${user.tag} avatar: ${user.displayAvatarURL({ dynamic: true, size: 1024 })}` });
    }
};
