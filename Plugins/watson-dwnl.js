const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const googleTTS = require("google-tts-api");
const axios = require('axios');
const yts = require('yt-search');
const config = require('../config'); // Importing config file
const url = require('url'); // Importing url module

const allowedHosts = ['open.spotify.com']; // Whitelist of allowed hosts

const prefix = config.PREFIX; // Get the prefix from the config

// Song Downloader Command
cmd({
    pattern: "play7",
    alias: ["audio"],
    desc: "Download songs",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.PREFIX}play Spectre*\n*${config.PREFIX}play https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
        }

        // If a YouTube link is provided
        if (q.startsWith("https://youtu")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided YouTube link
                let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(q)}`);
                downloadUrl = response.data.result.download_url;

                // Download the audio
                const buffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

                // Send the audio to the user
                await conn.sendMessage(from, { audio: buffer.data, mimetype: "audio/mp3" }, { quoted: mek });
                await m.react("✅");
                return;
            } catch (err) {
                console.error("Error fetching download URL:", err);
                return reply("❌ Unable to fetch download URL. Please try again later.");
            }
        }

        // If no link, perform a search for the video
        const search = await yts(q);
        const data = search.videos[0];
        const videoUrl = data.url;

        // Fetch the download URL for the found video
        let downloadUrl;
        try {
            let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

        // Information Message
const infoMessage = {
    image: { url: data.thumbnail },
    caption: `
╭━▻〔 *PRECIOUS-MD SONG DOWNLOADER*━━━⬤
┃𖠄╭──────────────────·๏
┃𖠄┃• *Title:* ${data.title}
┃𖠄┃• *Quality:* mp3 (128kbps)
┃𖠄┃• *Duration:* ${data.timestamp}
┃𖠄┃• *Viewers:* ${data.views}
┃𖠄┃• *Uploaded:* ${data.ago}
┃𖠄┃• *Artist:* ${data.author.name}
┃𖠄└──────────────────·๏
┃𖠄╭──────────────────·๏
┃𖠄┃ Powered by WatsonFourpence
┃𖠄└──────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━⬤`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363391539600226@newsletter',
                    newsletterName: "Precious-Md",
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, infoMessage, { quoted: mek });

        // Send the audio file
        await conn.sendMessage(from, {
            audio: { url: downloadUrl },
            fileName: `${data.title}.mp3`,
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: data.title,
                    body: 'Powered by RAHUL-MASTER-V3',
                    thumbnailUrl: data.thumbnail,
                    sourceUrl: config.channelUrl,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error("Error in play command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

//ytmp3doc commands 
cmd({
    pattern: "ytmp3doc",
    alias: ["ytmdoc"],
    desc: "Download songs as documents",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.PREFIX}ytmp4doc Spectre*\n*${config.PREFIX}ytmp4doc https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
        }

        // If a YouTube link is provided
        if (q.startsWith("https://youtu")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided YouTube link
                let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(q)}`);
                downloadUrl = response.data.result.download_url;

                // Download the audio
                const buffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

                // Send the audio to the user as a document
                await conn.sendMessage(from, { 
                    document: buffer.data, 
                    mimetype: "audio/mp3", 
                    fileName: "song.mp3", 
                    contextInfo: {
                        forwardingScore: 5,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363391539600226@newsletter",
                            newsletterName: "Precious-Md",
                            serverMessageId: 143
                        }
                    }
                }, { quoted: mek });
                await m.react("✅");
                return;
            } catch (err) {
                console.error("Error fetching download URL:", err);
                return reply("❌ Unable to fetch download URL. Please try again later.");
            }
        }

        // If no link, perform a search for the video
        const search = await yts(q);
        const data = search.videos[0];
        const videoUrl = data.url;

        // Fetch the download URL for the found video
        let downloadUrl;
        try {
            let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

        // Information Message
const infoMessage = {
    image: { url: data.thumbnail },
    caption: `
╭━━▻〔 *PRECIOUS-MD SONG DOWNLOADER* 〕━━⬤
┃𖠄╭──────────────────·๏
┃𖠄┃• *Title:* ${data.title}
┃𖠄┃• *Quality:* mp3 (128kbps)
┃𖠄┃• *Duration:* ${data.timestamp}
┃𖠄┃• *Viewers:* ${data.views}
┃𖠄┃• *Uploaded:* ${data.ago}
┃𖠄┃• *Artist:* ${data.author.name}
┃𖠄└──────────────────·๏
┃𖠄╭──────────────────·๏
┃𖠄┃ Powered by WatsonFourpence
┃𖠄└───────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━⬤`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363391539600226@newsletter",
                    newsletterName: "Precious-Md",
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, infoMessage, { quoted: mek });

        // Send the audio file as a document
        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            fileName: `${data.title}.mp3`,
            mimetype: "audio/mpeg",
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: data.title,
                    body: "Powered by Precious-Md",
                    thumbnailUrl: data.thumbnail,
                    sourceUrl: config.channelUrl,
                    mediaType: 1,
                    renderLargerThumbnail: false
                },
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363391539600226@newsletter",
                    newsletterName: "Precious-Md",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error("Error in ytmp4doc command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
// Video Downloader Command
cmd({
    pattern: "video3",
    alias: ["mp4", "ytmp4"],
    desc: "Download videos",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.PREFIX}downloadvideo Spectre*\n*${config.PREFIX}downloadvideo https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
        }

        // If a YouTube link is provided
        if (q.startsWith("https://youtu")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided YouTube link (MP4)
                let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(q)}`);
                downloadUrl = response.data.result.download_url;

                // Download the video
                const buffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

                // Send the video to the user
                await conn.sendMessage(from, { video: buffer.data, mimetype: "video/mp4" }, { quoted: mek });
                await m.react("✅");
                return;
            } catch (err) {
                console.error("Error fetching download URL:", err);
                return reply("❌ Unable to fetch download URL. Please try again later.");
            }
        }

        // If no link, perform a search for the video
        const search = await yts(q);
        const data = search.videos[0];
        const videoUrl = data.url;

        // Fetch the download URL for the found video (MP4)
        let downloadUrl;
        try {
            let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

        // Information Message
const infoMessage = {
    image: { url: data.thumbnail },
    caption: `
╭━━▻〔 *PRECIOUS-MD VIDEO DWNLDR* 〕━━⬤
┃𖠄╭───────────────────·๏
┃𖠄┃• *Title:* ${data.title}
┃𖠄┃• *Quality:* mp3 (128kbps)
┃𖠄┃• *Duration:* ${data.timestamp}
┃𖠄┃• *Viewers:* ${data.views}
┃𖠄┃• *Uploaded:* ${data.ago}
┃𖠄┃• *Artist:* ${data.author.name}
┃𖠄└───────────────────·๏
┃𖠄╭───────────────────·๏
┃𖠄┃ Powered by WatsonFourpence
┃𖠄└───────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━⬤`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363391539600226@newsletter',
                    newsletterName: "Precious-Md",
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, infoMessage, { quoted: mek });

        // Send the video file
        await conn.sendMessage(from, {
            video: { url: downloadUrl },
            fileName: `${data.title}.mp4`,
            mimetype: 'video/mp4',
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: data.title,
                    body: 'Powered by Precious-Md',
                    thumbnailUrl: data.thumbnail,
                    sourceUrl: config.channelUrl,
                    mediaType: 2, // video
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error("Error in video download command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

//ytmp4doc commands 
cmd({
    pattern: "ytmp4doc",
    alias: ["mp4doc"],
    desc: "Download videos and send as document",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.PREFIX}ytmp4doc Spectre*\n*${config.PREFIX}ytmp4doc https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
        }

        // If a YouTube link is provided
        if (q.startsWith("https://youtu")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided YouTube link (MP4)
                let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(q)}`);
                downloadUrl = response.data.result.download_url;

                // Download the video
                const buffer = await axios.get(downloadUrl, { responseType: "arraybuffer" });

                // Send the video to the user as a document
                await conn.sendMessage(from, {
                    document: buffer.data,
                    mimetype: "video/mp4",
                    fileName: "video.mp4",
                    contextInfo: {
                        forwardingScore: 5,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363391539600226@newsletter",
                            newsletterName: "Precious-Md",
                            serverMessageId: 143
                        }
                    }
                }, { quoted: mek });
                await m.react("✅");
                return;
            } catch (err) {
                console.error("Error fetching download URL:", err);
                return reply("❌ Unable to fetch download URL. Please try again later.");
            }
        }

        // If no link, perform a search for the video
        const search = await yts(q);
        const data = search.videos[0];
        const videoUrl = data.url;

        // Fetch the download URL for the found video (MP4)
        let downloadUrl;
        try {
            let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

        // Information Message
const infoMessage = {
    image: { url: data.thumbnail },
    caption: `
╭━━▻〔 *PRECIOUS-MD VIDEO DWNLDR* 〕━━⬤
┃𖠄╭──────────────────·๏
┃𖠄┃• *Title:* ${data.title}
┃𖠄┃• *Quality:* mp3 (128kbps)
┃𖠄┃• *Duration:* ${data.timestamp}
┃𖠄┃• *Viewers:* ${data.views}
┃𖠄┃• *Uploaded:* ${data.ago}
┃𖠄┃• *Artist:* ${data.author.name}
┃𖠄└───────────────────·๏
┃𖠄╭───────────────────·๏
┃𖠄┃ Powered By Watson-Fourpence
┃𖠄└───────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━⬤`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363391539600226@newsletter",
                    newsletterName: "Precious-Md",
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, infoMessage, { quoted: mek });

        // Send the video file as a document
        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            fileName: `${data.title}.mp4`,
            mimetype: "video/mp4",
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: data.title,
                    body: "Powered Precious-Md",
                    thumbnailUrl: data.thumbnail,
                    sourceUrl: config.channelUrl,
                    mediaType: 2, // video
                    renderLargerThumbnail: false
                },
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363391539600226@newsletter",
                    newsletterName: "Precious-Md",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error("Error in ytmp4doc command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

// Google Drive Downloader Command
cmd({
    pattern: "gdrive",
    desc: "Download Google Drive Files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) {
            return reply("Please send me the Google Drive link.");
        }

        const url = q.trim();
        const apiUrl = `https://api.nexoracle.com/downloader/gdrive?apikey=ae1fa2a45a76baba7d&url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data || !response.data.result || !response.data.result.downloadUrl) {
            return reply("Sorry, I couldn't fetch the file. Make sure the link is valid.");
        }

        const fileData = response.data.result;
        await conn.sendMessage(from, {
            document: { url: fileData.downloadUrl },
            mimetype: fileData.mimetype,
            fileName: fileData.fileName,
        }, { quoted: mek });

        setTimeout(async () => {
            await conn.sendMessage(from, { text: "Here is your Google file made by Precious-Md" }, { quoted: mek });
        }, 5000);
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e.response?.data?.error || e}`);
    }
});

//Spotify commands 
cmd({
    pattern: "spotify",
    alias: ["spotifydownload", "spotifydl"],
    desc: "Download Spotify audio",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Spotify Song Link. Usage Example:\n*${config.PREFIX}spotify https://open.spotify.com/track/5n1lXmNIN4pgsYki9kVg1D*`);
        }

        // If a Spotify link is provided
        const parsedUrl = url.parse(q);
        if (allowedHosts.includes(parsedUrl.host)) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided Spotify link (MP3 audio)
                let response = await axios.get(`https://api.giftedtech.my.id/api/download/spotifydl?apikey=gifted&url=${encodeURIComponent(q)}`);
                downloadUrl = response.data.result.download_url;

                // Download the audio
                const buffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

                // Send the audio to the user
                await conn.sendMessage(from, { audio: buffer.data, mimetype: "audio/mp3" }, { quoted: mek });
                await m.react("✅");
                return;
            } catch (err) {
                console.error("Error fetching download URL:", err);
                return reply("❌ Unable to fetch download URL. Please try again later.");
            }
        }

        // If the query is not a Spotify URL, reply with instructions
        return reply(`❌ Invalid Spotify URL. Please use a valid Spotify track link. Example:\n*${config.PREFIX}spotify https://open.spotify.com/track/5n1lXmNIN4pgsYki9kVg1D*`);
    } catch (e) {
        console.error("Error in Spotify download command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

// Pinterest commands 
cmd({
    pattern: "pinterest",
    desc: "Download media from Pinterest.",
    category: "download",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const pinterestUrl = args[0];
        if (!pinterestUrl) {
            return reply("Please provide the Pinterest media URL.");
        }

        // Send the API request to fetch the download URL
        const response = await axios.get(`https://api.giftedtech.my.id/api/download/pinterestdl?apikey=gifted&url=${encodeURIComponent(pinterestUrl)}`);
        const downloadUrl = response.data.result.url;

        if (!downloadUrl) {
            return reply("❌ Unable to fetch the Pinterest media. Please check the URL and try again.");
        }

        // Send the media to the user
        await conn.sendMessage(m.from, {
            image: { url: downloadUrl },
            caption: "Downloaded Pinterest Image",
        });
        await m.react("✅");
    } catch (err) {
        console.error("Error fetching Pinterest media URL:", err);
        return reply("❌ Unable to fetch Pinterest media. Please try again later.");
    }
});

//apk commands 
cmd({
    pattern: "apk2",
    desc: "Download APK from the specified app.",
    category: "download",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const apkName = args.join(" ");
        if (!apkName) {
            return reply("Please provide the APK name.");
        }

        // Send the API request to fetch the download URL
        const response = await axios.get(`https://api.giftedtech.my.id/api/download/apkdl?apikey=gifted&appName=${encodeURIComponent(apkName)}`);
        
        const result = response.data.result;

        if (!result || !result.download_url) {
            return reply("❌ Unable to fetch the APK. Please check the name and try again.");
        }

        // Send the APK to the user
        await conn.sendMessage(m.from, {
            document: { url: result.download_url },
            fileName: `${result.appname}.apk`,
            mimetype: "application/vnd.android.package-archive",
            caption: `Downloaded APK for ${result.appname}`,
        });
        await m.react("✅");
    } catch (err) {
        console.error("Error fetching APK URL:", err);
        return reply("❌ Unable to fetch APK. Please try again later.");
    }
});

// Facebook Command
cmd({
    pattern: "facebook1",
    desc: "Download Facebook media.",
    category: "download",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const fbUrl = args[0];
        if (!fbUrl) {
            return reply("Please provide the Facebook media URL.");
        }

        // Send the API request to fetch the media URL
        const response = await axios.get(`https://api.giftedtech.my.id/api/download/facebook?apikey=gifted&url=${encodeURIComponent(fbUrl)}`);
        const result = response.data.result;

        if (!result || !result.url) {
            return reply("❌ Unable to fetch the Facebook media. Please check the URL and try again.");
        }

        const mediaUrl = result.url;

        // Send the video to the user
        await conn.sendMessage(m.from, {
            video: { url: mediaUrl },
            caption: "Downloaded Facebook Video",
        });
        await m.react("✅");
    } catch (err) {
        console.error("Error fetching Facebook media URL:", err);
        return reply("❌ Unable to fetch Facebook media. Please try again later.");
    }
});
