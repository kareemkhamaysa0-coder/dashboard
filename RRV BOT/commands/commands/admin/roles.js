const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('يضيف أو يزيل رتبة من عضو')
        .addUserOption(option => option.setName('target').setDescription('العضو').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('الرتبة').setRequired(true))
        .addStringOption(option => option.setName('action').setDescription('add/remove').setRequired(true)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) 
            return interaction.reply({ content: 'ما عندك صلاحية!', ephemeral: true });

        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        const role = interaction.options.getRole('role');
        const action = interaction.options.getString('action');

        if (!member) return interaction.reply({ content: 'العضو غير موجود!', ephemeral: true });

        if (action.toLowerCase() === 'add') {
            await member.roles.add(role);
            interaction.reply({ content: `تم إضافة رتبة ${role.name} لـ ${user.tag}` });
        } else if (action.toLowerCase() === 'remove') {
            await member.roles.remove(role);
            interaction.reply({ content: `تم إزالة رتبة ${role.name} من ${user.tag}` });
        } else {
            interaction.reply({ content: 'الرجاء كتابة add أو remove فقط', ephemeral: true });
        }
    }
};
