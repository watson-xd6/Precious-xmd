const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  AnyMessageContent,
  prepareWAMessageMedia,
  areJidsSameUser,
  downloadContentFromMessage,
  MessageRetryMap,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  generateMessageID, makeInMemoryStore,
  jidDecode,
  fetchLatestBaileysVersion,
  Browsers
  } = require('@whiskeysockets/baileys')
  
  const moment = require('moment-timezone')
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
   
  const l = console.log
  const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
  const fs = require('fs')
  const ff = require('fluent-ffmpeg')
  const P = require('pino')
  const config = require('./config')
  const qrcode = require('qrcode-terminal')
  const StickersTypes = require('wa-sticker-formatter')
  const util = require('util')
  const { sms,downloadMediaMessage } = require('./lib/msg')
  const FileType = require('file-type');
  const axios = require('axios')
  const { File } = require('megajs')
  const { fromBuffer } = require('file-type')
  const bodyparser = require('body-parser')
  const os = require('os')
  const Crypto = require('crypto')
  const path = require('path')
  const prefix = config.PREFIX
  
  const ownerNumber = ['263781330745']
  
  const tempDir = path.join(os.tmpdir(), 'cache-temp')
  if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
  }
  
  const clearTempDir = () => {
      fs.readdir(tempDir, (err, files) => {
          if (err) throw err;
          for (const file of files) {
              fs.unlink(path.join(tempDir, file), err => {
                  if (err) throw err;
              });
          }
      });
  }
  
  // Clear the temp directory every 5 minutes
  setInterval(clearTempDir, 5 * 60 * 1000);
  
//===================SESSION-AUTH============================
const sessionPath = path.join(__dirname, '/sessions/creds.json');
async function ensureSessionExists() {
  if (!fs.existsSync(sessionPath)) {
    if (!config.SESSION_ID) {
      console.log('Please add your session to SESSION_ID env !!');
      process.exit(1);
    }

    const sessdata = config.SESSION_ID;
    const file = File.fromURL(`https://mega.nz/file/${sessdata}`);

    console.log('⏳ Downloading session...');
    return new Promise((resolve, reject) => {
      file.download((err, data) => {
        if (err) return reject(err);
        fs.writeFile(sessionPath, data, (err) => {
          if (err) return reject(err);
          console.log('✅ Session downloaded');
          resolve();
        });
      });
    });
  }
}

const express = require("express");
const app = express();
const port = process.env.PORT || 9090;
  
  //=============================================
  
  // ------------------- Weather and Auto Bio Functions -------------------

async function getWeather() {
  try {
    const apiKey = '2d61a72574c11c4f36173b627f8cb177'; // Replace with your OpenWeatherMap API key
    const city = 'Harare';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const res = await axios.get(url);
    const data = res.data;
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    return `${temp}°C, ${desc}`;
  } catch (err) {
    console.error('Weather fetch error:', err);
    return 'Weather info unavailable';
  }
}

function startAutoBio(conn) {
  // Update profile status every 60 seconds with weather info
  autobioInterval = setInterval(async () => {
    const time = moment().tz("Africa/Harare").format("HH:mm:ss");
    const date = moment().tz("Africa/Harare").format("YYYY-MM-DD");
    const uptime = clockString(process.uptime() * 1000);
    
    const battery = conn?.battery ?? { value: 'N/A', isCharging: false };
    const batteryText = battery.value !== 'N/A' 
      ? `${battery.value}% ${battery.isCharging ? '⭐️ Charging' : ''}` 
      : 'Battery info unavailable';
    
    const weather = await getWeather();
    
    const bio = `🧚‍♀️ PRECIOUS-MD | 《WATSON FOURPENCE 2025》\n📅 ${date} | 🕒 ${time}\n🌡 Uptime: ${uptime}\n🔋 Battery: ${batteryText}\n⛅ Weather: ${weather}\n👑 Owner: wa.me/263781330745`;
    await conn.updateProfileStatus(bio).catch(console.error);
  }, 60 * 1000);
}

function stopAutoBio() {
  if (autobioInterval) clearInterval(autobioInterval);
}

// ---------------------- End of Auto Bio Functions ---------------------
function convertButtonsToSections(buttons) {
          return [
            {
              title: "Select a category please :)",
              highlight_label: "PRECIOUS-MD",
              rows: buttons.map((button) => ({
                title: button.buttonText.displayText.toUpperCase(),
                description: ${button.buttonText.displayText.split(" ")[0]},
                id: button.buttonId,
              })),
            },
          ];
        }

        conn.newlist = async (from, data) => {
          let sections = await convertButtonsToSections(data.buttons); // Fixed typo
          let listMessage = {
            title: "Select A Category ⎙",
            sections,
          };
          await conn.sendMessage(from, {
            image: data.image,
            caption: data.caption,
            footer: data.footer,
            buttons: [
              {
                buttonId: prefix + ping,
                buttonText: { displayText: "Ping 📍" },
                type: 1,
              },
              {
                buttonId: prefix + owner,
                buttonText: { displayText: "Owner 🗿" },
                type: 1,
              },
              {
                buttonId: "action",
                buttonText: { displayText: "ini pesan interactiveMeta" },
                type: 4,
                nativeFlowInfo: {
                  name: "single_select",
                  paramsJson: JSON.stringify(listMessage),
                },
              },
            ],
            headerType: data.headerType,
            viewOnce: true,
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "12036329997814957@newsletter",
                newsletterName: config?.BOTNAME || "PRECIOUS-MD💚",
                serverMessageId: 999,
              },
            },
          });
        };
        conn.newButton = async (from, data) => {
          const buttonMessage = {
            image: data.image,
            caption: data.caption,
            footer: data.footer,
            buttons: data.buttons,
            headerType: data.headerType,
            viewOnce: true,
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "12036329997814957@newsletter",
                newsletterName: "PRECIOUS-MD💚",
                serverMessageId: 999,
              },
            },
          };

          await conn.sendMessage(from, buttonMessage, { quoted: mek });
        };
//------------------- CONNECTION TO WHATSAPP -----------------------
  
  
  async function connectToWA() {
  console.log("Connecting to WhatsApp ♻️...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/sessions/')
  var { version } = await fetchLatestBaileysVersion()
  
  const conn = makeWASocket({
          logger: P({ level: 'silent' }),
          printQRInTerminal: false,
          browser: Browsers.macOS("Firefox"),
          syncFullHistory: true,
          auth: state,
          version
          })
      
  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
        console.log("⚠️ Disconnected... trying to reconnect");
        connectToWA();
      } else {
        console.log("❌ Logged out from WhatsApp");
      }
    } else if (connection === 'open') {
      console.log('✅ Installing Plugins');
      const path = require('path');
      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
          require("./plugins/" + plugin);
        }
      });
      console.log('Plugins installed successful ✅');
      console.log('Bot connected to whatsapp ✅');

      let up = `𒁂✶⊶⊷⊷❍⊶✶⊶⊶⊷❍⊶⊷⊷✶⊶⊷✶●●►

➠ 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐏𝐑𝐄𝐂𝐈𝐎𝐔𝐒-𝐌𝐃 🚴三
➠ ℙ𝕣𝕖𝕗𝕚𝕩:* ${prefix}
➠ 𝕆𝕨𝕟𝕖𝕣:* ${ownerNumber}
➠ 𝕄𝔸𝔻𝔼 𝔹𝕐:* 𝕎𝔸𝕋𝕊𝕆ℕ 𝕆𝔽𝔽𝕀ℂ𝕀𝔸𝕃
➠ 𝔹𝕆𝕋 ℕ𝔸𝕄𝔼:* *ℙℝ𝔼ℂ𝕀𝕆𝕌𝕊-𝕄𝔻*

➠ ᵗʰᵃⁿᵏ ʸᵒᵘ ᶠᵒʳ ᵘˢⁱⁿᵍ ᵖʳᵉᶜⁱᵒᵘˢ-ᵐᵈ

➠ *😍Join WhatsApp Channel - :* https://whatsapp.com/channel/0029VawJnZ2Id7nFdp0NEE2u
➠ *🧸YouTube - :* https://www.youtube.com/@watson-xd3

𒁂✶⊶⊷⊷❍⊶✶⊶⊷⊶⊷❍⊶⊷⊶⊷✶⊶⊷✶●●► `;
      
      conn.sendMessage(conn.user.id, { 
        image: { url: `https://files.catbox.moe/2899fa.jpg` }, 
        caption: up 
      });
      
      // Start auto bio update with weather info
      startAutoBio(conn);
    }
  });

  conn.ev.on('creds.update', saveCreds);
    
          
//============= readstatus ============
conn.ev.on('messages.upsert', async (meks) => {
  let mek = meks.messages[0];
  if (!mek.message) return;

  // Handle ephemeralMessage
  mek.message = (getContentType(mek.message) === 'ephemeralMessage')
    ? mek.message.ephemeralMessage.message
    : mek.message;

  // Mark all messages as read
  if (config.READ_MESSAGE === 'true') {
    await conn.readMessages([mek.key]);
    console.log(`Marked message from ${mek.key.remoteJid} as read.`);
  }

  // Handle viewOnce messages
  if (mek.message?.viewOnceMessageV2) {
    mek.message = (getContentType(mek.message) === 'ephemeralMessage')
      ? mek.message.ephemeralMessage.message
      : mek.message;
  }

  // === STATUS HANDLERS ===
  if (mek.key.remoteJid === 'status@broadcast') {
    const from = mek.key.participant || mek.pushName;

    // Avoid reacting to own status
    if (from === conn.user.jid) return;

    // AUTO SEEN
    if (config.AUTO_STATUS_SEEN === "true") {
      await conn.readMessages([mek.key]);
    }

    // AUTO REACT
    if (config.AUTO_STATUS_REACT === "true") {
      const emojis = ['🤔', '🤩', '😘', '👍', '🦋', '🥰', '🥳', '😊', '🫡', '🤫', '🤗', '🫣', '😇', '😎', '❤️', '🧡', '💛', '💚', '🩵', '💙', '💜', '🤎', '🖤', '🩶', '🤍', '🩷', '💝', '💖', '💗', '💓', '💞', '💕', '❤️‍🩹', '❣️', '💔', '❤️‍🔥', '🦚'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      try {
        await conn.sendMessage(mek.key.remoteJid, {
          react: {
            text: randomEmoji,
            key: mek.key
          }
        });
      } catch (err) {
        console.error('Auto React Error:', err);
      }
    }

    // AUTO REPLY
    if (config.AUTO_STATUS_REPLY === "true") {
      const user = mek.key.participant;
      const text = `${config.AUTO_STATUS_MSG}`;
      try {
        await conn.sendMessage(from, {
          text,
          react: { text: '💜', key: mek.key }
        }, { quoted: mek });
      } catch (err) {
        console.error('Auto Reply Error:', err);
      }
    }
  }

  // === ANTI VIEW ONCE ===
      let watson1 = mek.message.viewOnceMessageV2
      let watson = mek.mtype === "viewOnceMessage"
  if (watson && config.ANTI_VV === "true") {
    if (watson.message.imageMessage) {
    let cap = watson.message.imageMessage.caption;
    let anu = await conn.downloadAndSaveMediaMessage(watson.message.imageMessage);
    return conn.sendMessage("263781330745@s.whatsapp.net", { image: { url: anu }, caption: cap }, { quoted: mek });
  } if (watson.message.videoMessage) {
    let cap = watson.message.videoMessage.caption;
    let anu = await conn.downloadAndSaveMediaMessage(watson.message.videoMessage);
    return conn.sendMessage("263781330745@s.whatsapp.net", { video: { url: anu }, caption: cap }, { quoted: mek });
  } if (watson.message.audioMessage) {
    let anu = await conn.downloadAndSaveMediaMessage(watson.message.audioMessage);
    return conn.sendMessage("263781330745@s.whatsapp.net", { audio: { url: anu }, caption: cap }, { quoted: mek });
  }
  }
  const m = sms(conn, mek)
  const type = getContentType(mek.message)
  const content = JSON.stringify(mek.message)
  const from = mek.key.remoteJid
  const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
  const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
  const isCmd = body.startsWith(prefix)
  const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
  const args = body.trim().split(/ +/).slice(1)
  const q = args.join(' ')
  const isGroup = from.endsWith('@g.us')
  const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
  const senderNumber = sender.split('@')[0]
  const botNumber = conn.user.id.split(':')[0]
  const pushname = mek.pushName || 'Sin Nombre'
  const isMe = botNumber.includes(senderNumber)
  const isOwner = ownerNumber.includes(senderNumber) || isMe
  const botNumber2 = await jidNormalizedUser(conn.user.id);
  const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const participants = isGroup ? await groupMetadata.participants : ''
  const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
  const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
  const isAdmins = isGroup ? groupAdmins.includes(sender) : false
  const isReact = m.message.reactionMessage ? true : false
  const reply = (teks) => {
  conn.sendMessage(from, { text: teks }, { quoted: mek })
  }
  //===================================================   
  conn.decodeJid = jid => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user &&
          decode.server &&
          decode.user + '@' + decode.server) ||
        jid
      );
    } else return jid;
  };
  //===================================================
  conn.copyNForward = async(jid, message, forceForward = false, options = {}) => {
    let vtype
    if (options.readViewOnce) {
        message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
        vtype = Object.keys(message.message.viewOnceMessage.message)[0]
        delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
        delete message.message.viewOnceMessage.message[vtype].viewOnce
        message.message = {
            ...message.message.viewOnceMessage.message
        }
    }
  
    let mtype = Object.keys(message.message)[0]
    let content = await generateForwardMessageContent(message, forceForward)
    let ctype = Object.keys(content)[0]
    let context = {}
    if (mtype != "conversation") context = message.message[mtype].contextInfo
    content[ctype].contextInfo = {
        ...context,
        ...content[ctype].contextInfo
    }
    const waMessage = await generateWAMessageFromContent(jid, content, options ? {
        ...content[ctype],
        ...options,
        ...(options.contextInfo ? {
            contextInfo: {
                ...content[ctype].contextInfo,
                ...options.contextInfo
            }
        } : {})
    } : {})
    await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
    return waMessage
  }
  //=================================================
  conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }
    let type = await FileType.fromBuffer(buffer)
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
    await fs.writeFileSync(trueFileName, buffer)
    return trueFileName
  }
  //=================================================
  conn.downloadMediaMessage = async(message) => {
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }
  
    return buffer
  }
  
  /**
  *
  * @param {*} jid
  * @param {*} message
  * @param {*} forceForward
  * @param {*} options
  * @returns
  */
  //================================================
  conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
                let mime = '';
                let res = await axios.head(url)
                mime = res.headers['content-type']
                if (mime.split("/")[1] === "gif") {
                  return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
                }
                let type = mime.split("/")[0] + "Message"
                if (mime === "application/pdf") {
                  return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
                }
                if (mime.split("/")[0] === "image") {
                  return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
                }
                if (mime.split("/")[0] === "video") {
                  return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
                }
                if (mime.split("/")[0] === "audio") {
                  return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
                }
              }
  //==========================================================
  conn.cMod = (jid, copy, text = '', sender = conn.user.id, options = {}) => {
    //let copy = message.toJSON()
    let mtype = Object.keys(copy.message)[0]
    let isEphemeral = mtype === 'ephemeralMessage'
    if (isEphemeral) {
        mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
    }
    let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
    let content = msg[mtype]
    if (typeof content === 'string') msg[mtype] = text || content
    else if (content.caption) content.caption = text || content.caption
    else if (content.text) content.text = text || content.text
    if (typeof content !== 'string') msg[mtype] = {
        ...content,
        ...options
    }
    if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
    else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
    copy.key.remoteJid = jid
    copy.key.fromMe = sender === conn.user.id
  
    return proto.WebMessageInfo.fromObject(copy)
  }
  
  
  /**
  *
  * @param {*} path
  * @returns
  */
  //=====================================================
  conn.getFile = async(PATH, save) => {
    let res
    let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split `,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
    let type = await FileType.fromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
    }
    let filename = path.join(__filename, __dirname + new Date * 1 + '.' + type.ext)
    if (data && save) fs.promises.writeFile(filename, data)
    return {
        res,
        filename,
        size: await getSizeMedia(data),
        ...type,
        data
    }
  
  }
  //=====================================================
  conn.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
    let types = await conn.getFile(PATH, true)
    let { filename, size, ext, mime, data } = types
    let type = '',
        mimetype = mime,
        pathFile = filename
    if (options.asDocument) type = 'document'
    if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./exif.js')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: Config.packname, author: Config.packname, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
    } else if (/image/.test(mime)) type = 'image'
    else if (/video/.test(mime)) type = 'video'
    else if (/audio/.test(mime)) type = 'audio'
    else type = 'document'
    await conn.sendMessage(jid, {
        [type]: { url: pathFile },
        mimetype,
        fileName,
        ...options
    }, { quoted, ...options })
    return fs.promises.unlink(pathFile)
  }
  //=====================================================
  conn.parseMention = async(text) => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
  }
  //=====================================================
  conn.sendMedia = async(jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
    let types = await conn.getFile(path, true)
    let { mime, ext, res, data, filename } = types
    if (res && res.status !== 200 || file.length <= 65536) {
        try { throw { json: JSON.parse(file.toString()) } } catch (e) { if (e.json) throw e.json }
    }
    let type = '',
        mimetype = mime,
        pathFile = filename
    if (options.asDocument) type = 'document'
    if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : Config.packname, author: options.author ? options.author : Config.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
    } else if (/image/.test(mime)) type = 'image'
    else if (/video/.test(mime)) type = 'video'
    else if (/audio/.test(mime)) type = 'audio'
    else type = 'document'
    await conn.sendMessage(jid, {
        [type]: { url: pathFile },
        caption,
        mimetype,
        fileName,
        ...options
    }, { quoted, ...options })
    return fs.promises.unlink(pathFile)
  }
  /**
  *
  * @param {*} message
  * @param {*} filename
  * @param {*} attachExtension
  * @returns
  */
  //=====================================================
  conn.sendVideoAsSticker = async (jid, buff, options = {}) => {
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options);
    } else {
      buffer = await videoToWebp(buff);
    }
    await conn.sendMessage(
      jid,
      { sticker: { url: buffer }, ...options },
      options
    );
  };
  //=====================================================
  conn.sendImageAsSticker = async (jid, buff, options = {}) => {
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options);
    } else {
      buffer = await imageToWebp(buff);
    }
    await conn.sendMessage(
      jid,
      { sticker: { url: buffer }, ...options },
      options
    );
  };
      /**
       *
       * @param {*} jid
       * @param {*} path
       * @param {*} quoted
       * @param {*} options
       * @returns
       */
  //=====================================================
  conn.sendTextWithMentions = async(jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
  
          /**
           *
           * @param {*} jid
           * @param {*} path
           * @param {*} quoted
           * @param {*} options
           * @returns
           */
  //=====================================================
  conn.sendImage = async(jid, path, caption = '', quoted = '', options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
  }
  
  /**
  *
  * @param {*} jid
  * @param {*} path
  * @param {*} caption
  * @param {*} quoted
  * @param {*} options
  * @returns
  */
  //=====================================================
  conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })
  
  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} caption
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  //=====================================================
  conn.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
    let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        //========================================================================================================================================
    conn.sendMessage(jid, buttonMessage, { quoted, ...options })
  }
  //=====================================================
  conn.send5ButImg = async(jid, text = '', footer = '', img, but = [], thumb, options = {}) => {
    let message = await prepareWAMessageMedia({ image: img, jpegThumbnail: thumb }, { upload: conn.waUploadToServer })
    var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
            hydratedTemplate: {
                imageMessage: message.imageMessage,
                "hydratedContentText": text,
                "hydratedFooterText": footer,
                "hydratedButtons": but
            }
        }
    }), options)
    conn.relayMessage(jid, template.message, { messageId: template.key.id })
  }
  
  /**
  *
  * @param {*} jid
  * @param {*} buttons
  * @param {*} caption
  * @param {*} footer
  * @param {*} quoted
  * @param {*} options
  */
  //=====================================================
         
  //================ownerreact==============
  
  if(senderNumber.includes("263789622747")){
  if(isReact) return
  m.react("👑")
  }
  
  //==========public react============//
  // Auto React 
  if (!isReact && senderNumber !== botNumber) {
      if (config.AUTO_REACT === 'true') {
          const reactions = [
        '🌼', '❤️', '💐', '🔥', '🏵️', '❄️', '🧊', '🐳', '💥', '🥀', '❤‍🔥', '🥹', '😩', '🫣', 
        '🤭', '👻', '👾', '🫶', '😻', '🙌', '🫂', '🫀', '👩‍🦰', '🧑‍🦰', '👩‍⚕️', '🧑‍⚕️', '🧕', 
        '👩‍🏫', '👨‍💻', '👰‍♀', '🦹🏻‍♀️', '🧟‍♀️', '🧟', '🧞‍♀️', '🧞', '🙅‍♀️', '💁‍♂️', '💁‍♀️', '🙆‍♀️', 
        '🙋‍♀️', '🤷', '🤷‍♀️', '🤦', '🤦‍♀️', '💇‍♀️', '💇', '💃', '🚶‍♀️', '🚶', '🧶', '🧤', '👑', 
        '💍', '👝', '💼', '🎒', '🥽', '🐻', '🐼', '🐭', '🐣', '🪿', '🦆', '🦊', '🦋', '🦄', 
        '🪼', '🐋', '🐳', '🦈', '🐍', '🕊️', '🦦', '🦚', '🌱', '🍃', '🎍', '🌿', '☘️', '🍀', 
        '🍁', '🪺', '🍄', '🍄‍🟫', '🪸', '🪨', '🌺', '🪷', '🪻', '🥀', '🌹', '🌷', '💐', '🌾', 
        '🌸', '🌼', '🌻', '🌝', '🌚', '🌕', '🌎', '💫', '🔥', '☃️', '❄️', '🌨️', '🫧', '🍟', 
        '🍫', '🧃', '🧊', '🪀', '🤿', '🏆', '🥇', '🥈', '🥉', '🎗️', '🤹', '🤹‍♀️', '🎧', '🎤', 
        '🥁', '🧩', '🎯', '🚀', '🚁', '🗿', '🎙️', '⌛', '⏳', '💸', '💎', '⚙️', '⛓️', '🔪', 
        '🧸', '🎀', '🪄', '🎈', '🎁', '🎉', '🏮', '🪩', '📩', '💌', '📤', '📦', '📊', '📈', 
        '📑', '📉', '📂', '🔖', '🧷', '📌', '📝', '🔏', '🔐', '🩷', '❤️', '🧡', '💛', '💚', 
        '🩵', '💙', '💜', '🖤', '🩶', '🤍', '🤎', '❤‍🔥', '❤‍🩹', '💗', '💖', '💘', '💝', '❌', 
        '✅', '🔰', '〽️', '🌐', '🌀', '⤴️', '⤵️', '🔴', '🟢', '🟡', '🟠', '🔵', '🟣', '⚫', 
        '⚪', '🟤', '🔇', '🔊', '📢', '🔕', '♥️', '🕐', '🚩', '🇵🇰'
    ];
  
          const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]; // 
          m.react(randomReaction);
      }
  }
  
  // Owner React
  if (!isReact && senderNumber === botNumber) {
      if (config.OWNER_REACT === 'true') {
          const reactions = ["👑", "💀", "📊", "⚙️", "🧠", "🎯", "📈", "📝", "🏆", "🌍", "🇵🇰", "💗", "❤️", "💥", "🌼", "🏵️", ,"💐", "🔥", "❄️", "🌝", "🌚", "🐥", "🧊"];
          const randomOwnerReaction = reactions[Math.floor(Math.random() * reactions.length)]; // 
          m.react(randomOwnerReaction);
      }
  }
   
// custum react settings        
                        
if (!isReact && senderNumber !== botNumber) {
    if (config.CUSTOM_REACT === 'true') {
        // Use custom emojis from the configuration
        const reactions = (config.CUSTOM_REACT_EMOJIS || '😍,😂,👍🏻,🙂,😉').split(',');
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        m.react(randomReaction);
    }
}

if (!isReact && senderNumber === botNumber) {
    if (config.CUSTOM_REACT === 'true') {
        // Use custom emojis from the configuration
        const reactions = (config.CUSTOM_REACT_EMOJIS || '😍,😂,👍🏻,🙂,😉').split(',');
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        m.react(randomReaction);
    }
}
  //==========WORKTYPE============ 
  if(!isOwner && config.MODE === "private") return
  if(!isOwner && isGroup && config.MODE === "inbox") return
  if(!isOwner && !isGroup && config.MODE === "groups") return
   
  // take commands 
                 
  const events = require('./command')
  const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
  if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
  if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})
  
  try {
  cmd.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
  } catch (e) {
  console.error("[PLUGIN ERROR] " + e);
  }
  }
  }
  events.commands.map(async(command) => {
  if (body && command.on === "body") {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  } else if (mek.q && command.on === "text") {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  } else if (
  (command.on === "image" || command.on === "photo") &&
  mek.type === "imageMessage"
  ) {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  } else if (
  command.on === "sticker" &&
  mek.type === "stickerMessage"
  ) {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  }});
  
  })
  }
  
  app.get("/", (req, res) => {
  res.send("Precious-Md Connected ✅");
  });
  app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
  setTimeout(() => {
  connectToWA()
  }, 4000);
  
