const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('hentai')
		.setDescription('Post a random hentai image.'),
	async execute(interaction) {
        fetch(`http://localhost:3000/hentai/${Math.floor(Math.random() * 4)}`).then((response) => response.json()).then(async (data) => {
            await interaction.reply(`${data[0].link}`);
        });
		
	},
};	