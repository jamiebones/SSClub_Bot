const { Client, GatewayIntentBits } = require('discord.js');
import "./deploy-commands";
import * as mongoose from 'mongoose';

const { DB_USER, DB_PASSWORD, DATABASE_MONGO } = process.env



// connect to database

console.log("initiating MongoDB connection......")
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@ssc1980-cluster.xe0syn3.mongodb.net/${DATABASE_MONGO}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ).then(() => {
        console.log("Connected to db");
    })
    .catch((err) => console.log(err.message));



const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
        // Add other intents as needed
    ],
});



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    console.log("username ", msg.author)
    if (msg.content === 'ping') {
        msg.reply('pong');
    }

});

// client.on('guildMemberAdd', member => {
//     // Check the member properties, such as username
//     if (someCondition) { // Replace with your condition
//       member.kick('Optional reason that will display in the audit logs')
//         .then(() => console.log(`Kicked ${member.displayName}`))
//         .catch(console.error);
//     }
//   });

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'birthday') {
        const day = interaction.options.getInteger('day');
        const month = interaction.options.getInteger('month');
        await interaction.reply(`Your birthday has been set to ${day} ${month}.`);
    }
});

client.login(process.env.DISCORD_TOKEN);