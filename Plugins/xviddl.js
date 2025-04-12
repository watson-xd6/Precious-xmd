const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

cmd({
    pattern: "xvideo",
    alias: ["xvid"],
    use: '.xvid <query>',
    react: "🍟",
    desc: "Search and DOWNLOAD VIDEOS from xvideos.",
    category: "nsfw",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
//if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
if (!q) return reply('🚩 *Please give me words to search*')
let res = await fetchJson('https://raganork-network.vercel.app/api/xvideos/search?query='+q)
let wm = `WATSON-XD-BOT v${require("../package.json").version} (Test)\nWATSON-FOURPENCE`
const msg = `乂 X V I D - D O W N L O A D E R `
const data = res.result
if (data.length < 1) return await conn.sendMessage(from, { text: "🚩 *I couldn't find anything :(*" }, { quoted: mek } )
var sections = []
        res.result.map((v) => {
          sections.push({
            rows: [{
              title: `${v.title}`,
              description: `Info : ${v.duration}`,
              id: `.xnxxdl ${v.url}`
            }]
          })
        })
        const buttons = [{
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: 'Tap Here!',
            sections
          })
        }]
        let message = {
            imge: `https://logohistory.net/wp-content/uploads/2023/06/XVideos-Logo-2007-1024x576.png`,
            header: '',
            footer: wm,
            body: msg
        }
return conn.sendButtonMessage(from, buttons, m, message) 
} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
}
})

//------------------------dl---------------
cmd({
    pattern: "xvideodown",
    alias: ["xviddl","xvideodl"],
    react: '🍟',
    category: "nsfw",
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
 if (!q) return reply('*Please give me instagram url !!*')
  let res = await fetchJson('https://raganork-network.vercel.app/api/xvideos/download?url='+url)
  let wm = `WATSON-XD-BOT v${require("../package.json").version} (Test)\nWATSON-FOURPENCE `
  await conn.sendMessage(from, { video: { url: res.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
