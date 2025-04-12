// menu1.js - Clean & Modular Interactive Menu

const config = require('../config');
const { cmd, commands } = require('../command');

const prefix = config.PREFIX || ".";
const mode = config.MODE || "public";

let menu = {
  ai: '', download: '', fun: '', owner: '', group: '', privacy: '',
  search: '', system: '', main: '', sticker: '', other: '', nsfw: '',
  anime: '', utility: '', tools: '', logo: ''
};

function formatUptime(seconds) {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;
  const hours = Math.floor(seconds / (60 * 60));
  seconds %= 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const uptime = formatUptime(process.uptime());
const totalCommands = commands.length;

// Build command category lists
for (let i = 0; i < commands.length; i++) {
  const command = commands[i];
  if (command.pattern && !command.dontAddCommandList) {
    if (menu[command.category] !== undefined) {
      menu[command.category] += `┃𖠄┃• ${prefix}${command.pattern}\n`;
    }
  }
}

const menuTitles = [
  "main", "ai", "download", "fun", "owner", "group", "privacy",
  "search", "system", "logo", "sticker", "tools", "other", "nsfw",
  "anime", "utility"
];

function getMenuList() {
  return `╭━━━━━〔 *PRECIOUS-MD* 〕━━━━━⬤
┃𖠄┃ *Owner:* WatsonFourpence
┃𖠄┃ *Prefix:* ${prefix}
┃𖠄┃ *Mode:* ${mode}
┃𖠄┃ *Commands:* ${totalCommands}
┃𖠄┃ *Uptime:* ${uptime}
┃𖠄┃ *Version:* v2.0.0
┃𖠄┃ *Creator:* WatsonFourpence
┃𖠄┃ *Channel:* https://whatsapp.com/channel/0029Vb2bsRhLCoWthwxUC82B
╰━━━━━━━━━━━━━━━━━━━━⬤

╭━━━〔 * MENU LIST* 〕━━━⬤
${menuTitles.map((title, i) => `┃𖠄┃ ${i + 1}. ${getIcon(i)} ${capitalize(title)} Menu`).join("\n")}
┃𖠄┃ *Reply with a number to view the menu!*
╰━━━━━━━━━━━━━━━━━━━━━━⬤\n> ${config.DESCRIPTION}`;
}

function getIcon(index) {
  const icons = ["💎", "🧠", "⬇️", "🤡", "🏆", "👨‍👩‍👧", "🔏", "📡", "🛠", "🖼", "🎨", "⚙️", "🌀", "🔞", "🍥", "🧩"];
  return icons[index] || "✴️";
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function sendMenuImage(conn, from, mek, captionText) {
  await conn.sendMessage(from, {
    image: { url: `https://files.catbox.moe/2899fa.jpg` },
    caption: captionText,
    contextInfo: {
      mentionedJid: [mek.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363391539600226@newsletter',
        newsletterName: 'PRECIOUS-MD',
        serverMessageId: 143
      }
    }
  }, { quoted: mek });
}

cmd({
  pattern: "menu1",
  desc: "Interactive command list",
  react: "🧚",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    await sendMenuImage(conn, from, mek, getMenuList());
    await conn.sendMessage(from, {
      audio: { url: 'https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});

cmd({
  pattern: "menu1",
  onlyPm: false,
  react: "✅",
  dontAddCommandList: true,
  filename: __filename
}, async (conn, mek, m, { body, quoted, reply }) => {
  if (!isNaN(body) && quoted && quoted.key.fromMe) {
    let option = parseInt(body);
    if (option >= 1 && option <= menuTitles.length) {
      let chosen = menuTitles[option - 1];
      let selectedMenu = `╭━━━▻〔 ${capitalize(chosen)} Menu 〕━━━━\n${menu[chosen] || '┃𖠄┃• No commands'}╰━━━━━━━━━━━━━━━━━━━━━`;
      return reply(selectedMenu);
    } else {
      return reply("┃𖠄┃• Invalid option. Please reply a number between 1 and 16.");
    }
  }
});
