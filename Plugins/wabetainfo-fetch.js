const command = require("../command");
const nimaWabetaInfo = require("@mrnima/wabetainfo")


command.cmd({
    pattern: "getinfo",
    react: "🔍",
    desc: "Wabetainfo link info get.",
    category: "download"
},
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
            if (!q) return reply("please give me wabetainfo search result link.");
            await reply("```Fetching ...```")
            var result = await nimaWabetaInfo.getFromLink(q);
            const data = result.result;
         let desc = `
*WATSON-XD-BOT WABETAINFO*
            
title: ${data.title}
date : ${data.date}
description: ${data.short_desc}

full info : ${data.desc}
            
*MADE BY WATSON-FOURPENCE*
            `
            await conn.sendMessage(from, { image: { url: data.image || "https://i.ibb.co/YhYStZ8/IMG-20240923-WA0006.jpg"}, caption: desc }, { quoted: mek });

        } catch (e) {
            console.log(e)
            reply(`${e}`)
        }
    })
