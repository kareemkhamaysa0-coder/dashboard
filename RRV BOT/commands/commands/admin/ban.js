const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('يحظر عضو من السيرفر')
        .addUserOption(option => option.setName('target').setDescription('العضو المراد حظره').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('سبب الحظر')),

    async execute(interaction) {
        if (!interaction.member.permissions.has('BanMembers')) 
            return interaction.reply({ content: 'ما عندك صلاحية!', ephemeral: true });

        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'لا يوجد سبب';
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.reply({ content: 'العضو غير موجود!', ephemeral: true });
        await member.ban({ reason });
        interaction.reply({ content: `${user.tag} تم حظره بنجاح!` });
    }
};
