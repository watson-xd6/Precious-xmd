const command = require("../command");
const nimaWabetaInfo = require("@mrnima/wabetainfo")


command.cmd({
    pattern: "wabeta",
    desc: "Search wa updates info.",
    category: "search"
},
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
            await reply("```Searching ...```")
            var caption = "*WABETAINFO SEARCH*\n\n";
            var result = await nimaWabetaInfo.getAll();
            for (let index = 0; index < result.result.length; index++) {
                caption += `[${index + 1}] *${result.result[index].title}* ( ${result.result[index].date} )`;
                caption += `\n*${result.result[index].link}*`;
                caption += "\n------------------------\n"
            }
            reply(caption)
        } catch (e) {
            console.log(e)
            reply(`${e}`)
        }
    })