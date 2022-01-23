import dotenv from 'dotenv';
import { Client } from 'discord.js';

dotenv.config();

const client = new Client({
    partials: ['CHANNEL'],
    intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES', 'DIRECT_MESSAGE_TYPING'],
});

const token = process.env.TOKEN;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'heimiik') {
        await interaction.reply('Looking to protect yourself or deal some damage?');
    }

    if (interaction.commandName === 'forge') {
        await interaction.reply('https://www.youtube.com/watch?v=HJZekaPAd_M');
    }

    return;
});

const withTyping = (message, reply, delay) => {
    const delayCalc = (delay * 100 > 10000) ? 10000 : (delay * 100);

    message.channel.sendTyping();
    setTimeout(() => { reply() }, delayCalc);
}
client.on('messageCreate', message => {
    // const authorMessage = message.content;
    // const authorName = message.author.username;
    // const authorTag = message.author.discriminator;
    // const taggedMessage = `${authorName.replace(' ', '_')}#${authorTag}: ${authorMessage}`;

    // const son = message.content.includes('<@!727937083477327883>');
    // const father = message.content.includes('<@!862033186762391563>');
    // const inosuke = message.content.includes('<@!405205980713058326>');
    // const hasCreatorId = son || father || inosuke;
    // const artemisId = '<@!837307398066274335>'
    // const hasArtemisId = message.mentions.has(client.user.id);

    if (message.channel.type === 'DM' && message.content === 'how did you learn blacksmithing?') {
        const answer = 'I was taught by the iron and the steel.';
        const reply = () => message.author.send(answer);

        withTyping(message, reply, answer.length);
        return
    }

    if (message.channel.type === 'GUILD_TEXT' && message.content === 'swords') {
        message.author.send('I prefer hammers.');
        return
    }

    if (message.content === 'What are you forging today, Heimiik?') {
        const answer = `It's none of your business, unless you have the coin ${message.member.nickname}`;
        const reply = () => message.reply(answer);

        withTyping(message, reply, answer.length);
        return
    }

    // if (hasArtemisId && hasCreatorId) {
    //     const answer = 'O que você quer com o Criador?';
    //     const reply = () => message.reply(answer);

    //     withTyping(message, reply, answer.length);
    //     return
    //}
    // if (message.content === artemisId) {
    //     const randomAnswer = Math.floor(Math.random() * mentionAnwers.length);
    //     const reply = () => message.reply(mentionAnwers[randomAnswer]);

    //     withTyping(message, reply, mentionAnwers[randomAnswer].length);
    //     return
    // }

    // if (hasArtemisId) {
    //     const randomAnswer = Math.floor(Math.random() * mentionFailures.length);
    //     const reply = () => message.reply(mentionFailures[randomAnswer]);

    //     withTyping(message, reply, mentionFailures[randomAnswer].length);
    //     return
    // }
});

client.login(token);