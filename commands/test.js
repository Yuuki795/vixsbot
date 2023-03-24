const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('just new command testing'),
	async execute(interaction) {
		await interaction.reply('its working yay!');
	},
};