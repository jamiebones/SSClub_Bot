const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

const discordToken = process.env.DISCORD_TOKEN;
let CLIENT_ID = process.env.CLIENTID
const GUILD_ID = process.env.GUILD_ID

const commands = [
    new SlashCommandBuilder()
        .setName('birthday') //command name
        .setDescription('Set your birthday')
        .addStringOption((option) =>
            option
                .setName('date')
                .setDescription('Select your birthday')
                .setRequired(true)
                .addChoices({ name: 'Day 1', value: "Day_1" }, { name: 'Day 2', value: "Day_2" })
        )
        .addStringOption((option) =>
            option
                .setName('month')
                .setDescription('Select your birthday month')
                .setRequired(true)
                .addChoices({ name: 'January', value: "January" }, { name: 'February', value: "February" })
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(discordToken);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();