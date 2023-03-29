// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Guild } = require('discord.js');
const { token } = require('./config/settings.json');
const Levels = require("discord-xp");
const fetch = require('node-fetch');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

Levels.setURL("mongodb://127.0.0.1:27017");

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on(Events.MessageCreate, async message => {
	if (message.author.bot) {return;}

	if(message.guildId == "1088610333981155368")
	{
		if(!await Levels.fetch(message.author.id, message.guildId))
		{
			Levels.createUser(message.author.id, message.guildId);
			try{
				fetch(`http://localhost:3000/level`, {
					method: "post",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					  },
		
					  body: JSON.stringify({
						id: message.author.id,
						level: 0,
						lastlevel: 0
					  })
				})
			}
			catch(err){
                console.log(err)
            }
		}
		else
		{
			await fetch(`http://localhost:3000/level/${message.author.id}`).then((response) => response.json()).then(async (data) => {
				
				lastLevel = await data[0].lastlevel;
				
				Levels.appendXp(message.author.id, message.guildId, 25);
				
				var person = await Levels.fetch(message.author.id, message.guildId);

				if(person.level > lastLevel)
				{
					if(person.level == 3)
					{
						message.member.roles.add("1090376265778876536").catch((e) => {console.log(e)})
					}
					//message.member.roles.add("1057774818520485898").catch((e) => {console.log(e)})
					client.channels.cache.get('1090371182102052955').send(`Congratulations <@${message.author.id}>! You are now level ${person.level}`);
					try{
						fetch(`http://localhost:3000/level/${message.author.id}`, {
							method: "put",
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							  },
				
							  body: JSON.stringify({
								id: message.author.id,
								level: person.level,
								lastlevel: person.level
							  })
						})
					}
					catch(err){
						console.log(err)
					}
				}
				else {
					try{
						fetch(`http://localhost:3000/level/${message.author.id}`, {
							method: "put",
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							  },
				
							  body: JSON.stringify({
								id: message.author.id,
								level: person.level,
								lastlevel: lastLevel
							  })
						})
					}
					catch(err){
						console.log(err)
					}
				}

			})	
		}
	}
	else if(message.guildId == "1043497922358169741")
	{
		if(!await Levels.fetch(message.author.id, message.guildId))
		{
			Levels.createUser(message.author.id, message.guildId);
			try{
				fetch(`http://localhost:3000/level`, {
					method: "post",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					  },
		
					  body: JSON.stringify({
						id: message.author.id,
						level: 0,
						lastlevel: 0
					  })
				})
			}
			catch(err){
                console.log(err)
            }
		}
		else
		{
			await fetch(`http://localhost:3000/level/${message.author.id}`).then((response) => response.json()).then(async (data) => {
				
				lastLevel = await data[0].lastlevel;
				
				Levels.appendXp(message.author.id, message.guildId, 25);
				
				var person = await Levels.fetch(message.author.id, message.guildId);

				if(person.level > lastLevel)
				{
					if(person.level == 3)
					{
						message.member.roles.add("1047911179101687808").catch((e) => {console.log(e)})
					}
					else if(person.level == 5)
					{
						message.member.roles.add("1057774818520485898").catch((e) => {console.log(e)})
					}
					else if(person.level == 10)
					{
						message.member.roles.add("1047911192183709766").catch((e) => {console.log(e)})
					}
					else if(person.level == 20)
					{
						message.member.roles.remove("1047911192183709766").catch((e) => {console.log(e)})
						message.member.roles.add("1047912982547533934").catch((e) => {console.log(e)})
					}
					else if(person.level == 30)
					{
						message.member.roles.remove("1047912982547533934").catch((e) => {console.log(e)})
						message.member.roles.add("1047913718341718026").catch((e) => {console.log(e)})
					}
					else if(person.level == 40)
					{
						message.member.roles.remove("1047913718341718026").catch((e) => {console.log(e)})
						message.member.roles.add("1047913888391376896").catch((e) => {console.log(e)})
					}
					else if(person.level == 50)
					{
						message.member.roles.remove("1047913888391376896").catch((e) => {console.log(e)})
						message.member.roles.add("1047913916778414171").catch((e) => {console.log(e)})
					}
					else if(person.level == 60)
					{
						message.member.roles.remove("1047913916778414171").catch((e) => {console.log(e)})
						message.member.roles.add("1090360453613494392 ").catch((e) => {console.log(e)})
					}

					client.channels.cache.get('1057043131486453900').send(`Congratulations <@${message.author.id}>! You are now level ${person.level}`);
					try{
						fetch(`http://localhost:3000/level/${message.author.id}`, {
							method: "put",
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							  },
				
							  body: JSON.stringify({
								id: message.author.id,
								level: person.level,
								lastlevel: person.level
							  })
						})
					}
					catch(err){
						console.log(err)
					}
				}
				else {
					try{
						fetch(`http://localhost:3000/level/${message.author.id}`, {
							method: "put",
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							  },
				
							  body: JSON.stringify({
								id: message.author.id,
								level: person.level,
								lastlevel: lastLevel
							  })
						})
					}
					catch(err){
						console.log(err)
					}
				}

			})	
		}
	}
})

// Log in to Discord with your client's token
client.login(token);