const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('يسكت عضو في السيرفر')
        .addUserOption(option => option.setName('target').setDescription('العضو المراد سكته').setRequired(true))
        .addIntegerOption(option => option.setName('minutes').setDescription('مدة السكوت بالدقائق').setRequired(false)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.MuteMembers)) 
            return interaction.reply({ content: 'ما عندك صلاحية!', ephemeral: true });

        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: 'العضو غير موجود!', ephemeral: true });

        const minutes = interaction.options.getInteger('minutes') || 10;
        const muteRole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'Muted'.toLowerCase());

        if (!muteRole) return interaction.reply({ content: 'لا يوجد رتبة Mute في السيرفر!', ephemeral: true });

        await member.roles.add(muteRole);
        interaction.reply({ content: `${user.tag} تم سكته لمدة ${minutes} دقيقة.` });

        setTimeout(async () => {
            if(member.roles.cache.has(muteRole.id)) await member.roles.remove(muteRole);
        }, minutes * 60 * 1000);
    }
};
