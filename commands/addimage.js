const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addimage')
		.setDescription('Add a image to the API.')
		.addStringOption(option => option.setName('tag').setDescription('What catogory does this image fall under?').setRequired(true)).setDMPermission(false)
        .addStringOption(option => option.setName('link').setDescription('Link to the image.').setRequired(true)).setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {

        
		const tag = interaction.options.getString('tag');
        const link = interaction.options.getString('link');

        if(tag == "femboy" || "straight || hentai")
        {
            try{
                fetch(`http://localhost:3000/${tag}`, {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
        
                      body: JSON.stringify({
                        id: await GetID(`http://localhost:3000/${tag}`),
                        link: link
                      })
                })
    
                await interaction.reply('Image added to API.');
            }
            catch(err){
                console.log(err)
                await interaction.reply("error check console");
            }
        }
        else{
            await interaction.reply("That is not a valid tag!");
        }
	},
};	

async function GetID(link) {
    var id;

    await fetch(link).then((response) => response.json()).then((data) => {
        id = data.length
    });

    return id;
}