const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "dog",
    desc: "Fetch a random dog image.",
    category: "fun",
    react: "🐶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://dog.ceo/api/breeds/image/random`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.message }, caption: '> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴡᴀᴛꜱᴏɴ ꜰᴏᴜʀᴘᴇɴᴄᴇ ' }, { quoted: mek });
    } catch (e) {
        console.log(e); // ❯𝐖𝐀𝐓𝐒𝐎𝐍-𝐗𝐃-𝐁𝐎𝐓
        reply(`єяяσя ƒєт¢нιηg ∂σg ιмαgє: ${e.message}`);
    }
});
