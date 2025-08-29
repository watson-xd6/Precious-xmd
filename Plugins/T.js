const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "p",
    react: "⚡",
    alias: ["speed"],
    desc: "Check bot's ping and quick actions",
    category: "main",
    use: '.p',
    filename: __filename
},
async (conn, mek, m, { from, reply, pushname }) => {
    try {
        const inital = new Date().getTime();

        // Define buttons
        const buttons = [
            { buttonId: 'ping', buttonText: { displayText: '⚡ Ping' }, type: 1 },
            { buttonId: 'alive', buttonText: { displayText: '🟢 Alive' }, type: 1 },
            { buttonId: 'owner', buttonText: { displayText: '👑 Owner' }, type: 1 }
        ];

        // Send button message
        await conn.sendMessage(from, {
            text: `Hello, ${pushname}!\nSelect an option below:`,
            buttons: buttons,
            footer: "Bot Quick Actions",
            headerType: 1
        }, { quoted: mek });

        // Calculate ping
        const final = new Date().getTime();
        await conn.sendMessage(from, {
            text: `*Pong!* 🏓\nResponse Time: *${final - inital} ms*`,
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});
