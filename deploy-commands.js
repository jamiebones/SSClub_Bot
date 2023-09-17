const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

const discordToken = process.env.DISCORD_TOKEN;
let CLIENT_ID = process.env.CLIENTID
const GUILD_ID = process.env.GUILD_ID

const commands = [
    new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Set your birthday')
        .addIntegerOption(option =>
            option.setName('month')
                .setDescription('Month of birth')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('day')
                .setDescription('Day of birth')
                .setRequired(true))

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