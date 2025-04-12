const { cmd, commands } = require('../command');

cmd({
    pattern: "ban",
    desc: "Ban a user from using bot commands.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isGroup, sender, isGroupAdmin, isOwner, reply }) => {
    if (!isGroup) return reply('❌ This command is for groups only!');
    if (!isGroupAdmin && !isOwner) return reply('❌ Only group admins or the bot owner can use this command!');
    
    const args = body.trim().split(' ');
    const target = args[1] ? args[1].replace('@', '') : null;

    if (!target) return reply('❌ Please mention a user to ban.');

    // Add the banned user to the banned list (in memory or database)
    const bannedUsers = []; // You can use a database or a persistent file to save banned users
    bannedUsers.push(target);

    // Inform the group that the user has been banned
    await conn.sendMessage(from, {
        text: `⚠️ User @${target} has been banned from using the bot commands.`
    }, {
        quoted: mek,
        contextInfo: { mentionedJid: [`${target}@s.whatsapp.net`] }
    });

    // Optionally, remove the user from the group
    await conn.groupRemove(from, [`${target}@s.whatsapp.net`]);

    // Block the user if you want to prevent DM
    await conn.updateBlockStatus(target + "@s.whatsapp.net", 'block');
});
