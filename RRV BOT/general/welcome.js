const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('إعداد رسالة الترحيب في السيرفر')
        .addStringOption(option => option.setName('message').setDescription('نص الترحيب').setRequired(true)),

    async execute(interaction) {
        // هنا يتم حفظ الرسالة في قاعدة بيانات صغيرة (يمكن تطويرها لاحقاً)
        await interaction.reply({ content: `تم ضبط رسالة الترحيب: ${interaction.options.getString('message')}`, ephemeral: true });
    }
};
