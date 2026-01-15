const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('يطرد عضو من السيرفر')
        .addUserOption(option => option.setName('target').setDescription('العضو المراد طرده').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('سبب الطرد')),

    async execute(interaction) {
        if (!interaction.member.permissions.has('KickMembers')) 
            return interaction.reply({ content: 'ما عندك صلاحية!', ephemeral: true });

        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'لا يوجد سبب';
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.reply({ content: 'العضو غير موجود!', ephemeral: true });
        await member.kick(reason);
        interaction.reply({ content: `${user.tag} تم طرده بنجاح!` });
    }
};
