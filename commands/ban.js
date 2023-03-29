const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a person from the current server.')
		.addUserOption(option => option.setName('target').setDescription('Select User to ban.').setRequired(true)).addStringOption(option => option.setName("reason").setDescription("Reason for ban.")).setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
        const reason = interaction.options.getString("reason")
		const e = new EmbedBuilder().setColor(0xFF0000).setTitle('User Banned').setDescription(`${interaction.user} banned ${target}`)

		await interaction.guild.members.ban();
		await interaction.reply({ embeds: [e] });
	},
};	