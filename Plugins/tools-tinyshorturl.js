/*

$$$$$$\            $$\                                               
$$  __$$\           $$ |                                              
$$ /  \__|$$\   $$\ $$$$$$$\  $$$$$$$$\  $$$$$$\   $$$$$$\   $$$$$$\  
\$$$$$$\  $$ |  $$ |$$  __$$\ \____$$  |$$  __$$\ $$  __$$\ $$  __$$\ 
 \____$$\ $$ |  $$ |$$ |  $$ |  $$$$ _/ $$$$$$$$ |$$ |  \__|$$ /  $$ |
$$\   $$ |$$ |  $$ |$$ |  $$ | $$  _/   $$   ____|$$ |      $$ |  $$ |
\$$$$$$  |\$$$$$$  |$$$$$$$  |$$$$$$$$\ \$$$$$$$\ $$ |      \$$$$$$  |
 \______/  \______/ \_______/ \________| \_______|\__|       \______/

Project Name : 𝐖𝐀𝐓𝐒𝐎𝐍-𝐗𝐃-𝐁𝐎𝐓 𝐂𝐑𝐄𝐀𝐓𝐈𝐎𝐍
Creator      : WATSON-FOURPENCE ( watson-xd )
Repo         : https//github.com/watson-xd3/WATSON-XD-BOT 
Support      : wa.me/263789622747
*/
// dont copy my shit😩
// im your boy watson-xd🫡

const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');


cmd({
  pattern: 'tinyurl',
  alias: ['tiny', 'shorten', 'short', 'shorturl'],
  react: '🪤',
  desc: 'Shorten a URL using TinyURL or ShortURL.',
  category: 'main',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) return reply('Please provide a URL to shorten.');

    await reply('> *Precious-Md Processing...*');

    let apiUrl = '';
    if (command === 'tiny' || command === 'tinyurl') {
      apiUrl = `https://api.davidcyriltech.my.id/tinyurl?url=${encodeURIComponent(q)}`;
    } else {
      apiUrl = `https://api.davidcyriltech.my.id/bitly?link=${encodeURIComponent(q)}`;
    }

    await reply('> *Shortening URL...*');

    const response = await fetchJson(apiUrl);
    const result = response.result;

    const caption = ` \`PRECIOUS-MD URL SHORTENER\` \n\n\n*Original Link:* ${q}\n\n*Shortened Link:* ${result}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴡᴀᴛꜱᴏɴ-ꜰᴏᴜʀᴘᴇɴᴄᴇ`;

   /* await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});
*/
 // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.imgur.com/QxeVvOc.jpeg` },  // Image URL
            caption: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363391539600226@newsletter',
                    newsletterName: 'WATSON-XD-BOT',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in shortining URL:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
