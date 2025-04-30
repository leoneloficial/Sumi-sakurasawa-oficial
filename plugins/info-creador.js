import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    await m.react('👑');

   
    if (!['owner', 'creator', 'creador', 'dueño'].includes(command.toLowerCase())) {
        return conn.sendMessage(m.chat, { text: `El comando ${command} no existe.` });
    }

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split('@')[0]}`;
    let username = conn.getName(m.sender);

    // VCARD
    let list = [{
        displayName: "leonel-Ofc 👑",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: leonel-oficial👑\nitem1.TEL;waid=2348030943459:2348030943459\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET:ninopina10@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/crowbot_wa\nitem3.X-ABLabel:Internet\nitem4.ADR:;; Nicaragua;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    }];

    const imageUrl = 'https://files.catbox.moe/k0kpaj.jpg';

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'һ᥆ᥣᥲ ᥴ᥆ᥒ𝗍ᥲᥴ𝗍᥆ ძᥱ mі ᥴrᥱᥲძ᥆r👑',
                body: dev,
                thumbnailUrl: imageUrl,
                sourceUrl: 'https://github.com/WillZek',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    });

    await conn.sendMessage(m.chat, { text: txt });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];
export default handler;