const axios = require('axios');
const { cmd } = require('../command');

cmd({
  pattern: 'insult',
  desc: 'Get a random insult',
  category: 'fun',
  react: '🤥',
}, 
async (Void, citel) => {
  try {
    const response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    const data = response.data;

    if (!data || !data.insult) {
      return citel.reply('Unable to retrieve an insult. Please try again later.');
    }

    return citel.reply(`*Insult:* ${data.insult}`);
  } catch (error) {
    return citel.reply(`Error: ${error.message || error}`);
  }
});





/*const axios = require('axios')
const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: 'insult',
  desc: 'Get a random insult',
  category: "fun",
  react: '🤥',
},
async (Void, citel) => {
  try {
    let response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    let data = response.data;

    if (!data || !data.insult) {
      return citel.reply('Unable to retrieve an insult. Please try again later.');
    }

    let insult = data.insult;
    return citel.reply(`*Insult:* ${insult}`);
  } catch (error) {
    citel.reply(`Error: ${error.message || error}`);
  }
});


/*
const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
    pattern: "autobio",
    desc: "Enable or disable auto bio update.",
    category: "owner",
    react: "♻️",
    filename: __filename
},
async (conn, mek, m, { reply, isOwner, args }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    let enable = args[0] === 'on';

    if (enable) {
        global.autobio = setInterval(async () => {
            const time = moment().tz("Africa/Harare").format("HH:mm:ss");
            const date = moment().tz("Africa/Harare").format("YYYY-MM-DD");
            const uptime = clockString(process.uptime() * 1000);
            const bio = `🤖 WATSON-XD Bot\n📅 ${date} | 🕒 ${time}\n⚡ Uptime: ${uptime}`;

            await conn.updateProfileStatus(bio).catch(_ => {});
        }, 60 * 1000); // every 1 minute

        reply("✅ Auto bio has been enabled.");
    } else {
        clearInterval(global.autobio);
        reply("❌ Auto bio has been disabled.");
    }
});

// Helper function to convert uptime to hh:mm:ss
function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}*/








/*
cmd({
    pattern: "autobio",
    desc: "Enable or disable auto bio update.",
    category: "owner",
    react: "♻️",
    filename: __filename
},
async (conn, mek, m, { reply, isOwner, args }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    let enable = args[0] === 'on';

    if (enable) {
        startAutoBio(conn);
        reply("✅ Auto bio has been enabled.");
    } else {
        stopAutoBio();
        reply("❌ Auto bio has been disabled.");
    }
});

// Automatically start autobio on bot launch
module.exports = {
    cmd,
    onStart(conn) {
        startAutoBio(conn);
    }
};

// Helper function
function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
    let autobioInterval;

const startAutoBio = (conn) => {
    autobioInterval = setInterval(async () => {
        const time = moment().tz("Africa/Harare").format("HH:mm:ss");
        const date = moment().tz("Africa/Harare").format("YYYY-MM-DD");
        const uptime = clockString(process.uptime() * 1000);

        let battery = conn?.battery ?? { value: 'N/A', isCharging: false };
        let batteryText = battery.value !== 'N/A' 
            ? `${battery.value}% ${battery.isCharging ? '⚡ Charging' : ''}` 
            : 'Battery info unavailable';

        const bio = `🤖 WATSON-XD Bot | 《WATSON FOURPENCE 2025》\n📅 ${date} | 🕒 ${time}\n⚡ Uptime: ${uptime}\n🔋 Battery: ${batteryText}\n👑 Owner: wa.me/${config.ownerNumber}`;

        await conn.updateProfileStatus(bio).catch(_ => {});
    }, 60 * 1000); // Update every 60 seconds
};

const stopAutoBio = () => {
    if (autobioInterval) clearInterval(autobioInterval);
};*/

