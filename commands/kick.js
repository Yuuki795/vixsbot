const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a person from the current server.')
		.addUserOption(option => option.setName('target').setDescription('Select User to Kick.').setRequired(true)).setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		
		const e = new EmbedBuilder().setColor(0xFF0000).setTitle('User Kicked').setImage(target.displayAvatarURL()).setDescription(`${interaction.user} kicked ${target}`)

		await interaction.guild.members.kick(target);
		await interaction.reply({ embeds: [e] });
	},
};	