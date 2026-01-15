module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'حدث خطأ أثناء تنفيذ الأمر.', ephemeral: true });
        }
    },
};
module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        if (!client.welcomeMessage) return;
        const channel = member.guild.systemChannel; // أو تحدد قناة معينة
        if (!channel) return;
        channel.send(`${member}, ${client.welcomeMessage}`);
    }
};
