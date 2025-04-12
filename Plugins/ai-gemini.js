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
Repo         : https//github.com/watson-xd3/Precious-Md
Support      : wa.me/263789622747
*/
// dont copy my shit😩
// im your boy watson-xd🫡



const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
  pattern: "bot",
  alias: ["geminai"],
  react: "🤖",
  desc: "AI chat.",
  category: "main",
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
    if (!q) return reply("Please ask a question or provide input for the AI.");
    const userInput = q.trim();
    if (userInput === "") return reply("Please provide a valid input.");
    const apiUrl = `https://api.giftedtech.web.id/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(userInput)}`;
    const response = await axios.get(apiUrl);
    console.log('API Response:', response.data);
    if (!response.data || !response.data.message) {
      return reply("No response from the AI or invalid API response.");
    }
    const aiResponse = response.data.message.trim();
    return reply(`\`🤖 GEMINI AI RESPONSE:\` \n\n${aiResponse}`);
  } catch (error) {
    console.error('Error:', error);
    reply(`An error occurred: ${error.message}`);
  }
});
