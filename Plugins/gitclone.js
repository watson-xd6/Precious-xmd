const { cmd } = require('../command');
const fetch = require('node-fetch');

// Define the gitclone command
cmd({
    pattern: 'gitclone',
    alias: ['downloader', 'git'],
    desc: 'Download GitHub repository as a zip file.',
    react: '👀',
    category: 'downloader',
    filename: __filename,
}, async (bot, message, client, { args, reply }) => {
    if (!args[0]) {
        return reply('⚠️ Where is the GitHub link?\n\nExample:\n.gitclone https://github.com/username/repository');
    }

    const githubUrl = args[0];
    const validGithubUrl = /^(https:\/\/)?github\.com\/.+/;

    if (!validGithubUrl.test(githubUrl)) {
        return reply('⚠️ Invalid GitHub link.');
    }

    try {
        const repoRegex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
        const match = githubUrl.match(repoRegex);

        if (!match) {
            throw new Error('⚠️ Invalid GitHub URL.');
        }

        const [, username, repoName] = match;
        const apiUrl = `https://api.github.com/repos/${username}/${repoName}/zipball`;
        const response = await fetch(apiUrl, { method: 'GET' });

        if (!response.ok) {
            throw new Error('❌ Repository not found.');
        }

        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition
            ? contentDisposition.match(/filename=(.*)/)[1]
            : `${repoName}.zip`;

        reply(`*📥 DOWNLOADING REPOSITORY...*\n\n*REPOSITORY:* ${username}/${repoName}\n*FILENAME:* ${filename}\n\n> *© Powered By WatsonFourpence*`);

        await bot.sendMessage(message.from, {
            document: { url: apiUrl },
            fileName: filename,
            mimetype: 'application/zip',
            contextInfo: {
                mentionedJid: [message.sender],
                forwardingScore: 999,
                isForwarded: true,
            },
        }, { quoted: message });
    } catch (error) {
        console.error(error);
        reply('❌ Failed to download the repository. Please try again later.');
    }
});