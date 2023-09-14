const { Client, GatewayIntentBits } = require('discord.js');
import "./deploy-commands";


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
        // Add other intents as needed
    ],
});



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log("message ", msg)
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'birthday') {
        const day = interaction.options.getString('date');
        const month = interaction.options.getString('month');
        console.log("date of birth", day, month)
        await interaction.reply(`Your birthday has been set to ${day} ${month}.`);
    }
});

client.login(process.env.DISCORD_TOKEN);