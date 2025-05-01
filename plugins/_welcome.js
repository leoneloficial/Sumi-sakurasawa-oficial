import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
    let bot = global.db.data.settings[conn.user.jid];
    
    global.botname = global.db.data.settings[conn.user.jid].botName || global.bottname;
    global.textbot = `${global.botname} Powered by ${conn.getName(conn.user.jid)}` || global.textobot;
    global.welcom1 = bot.welcome || global.welcomm1 || "¡Bienvenido al grupo!";
    global.welcom2 = bot.bye || global.welcomm2 || "¡Adiós! Esperamos verte pronto.";

    let redes = "";
    let dev = "Leonel"; 

    if (!m.messageStubType || !m.isGroup) return !0;
    
    let pp = bot.logo.welcome || await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/un7lt7.jpg');
    let img = await (await fetch(pp)).buffer();
    let chat = global.db.data.chats[m.chat];
    
    let txt = '⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿@⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪';
    let txt1 = '⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪𝘼𝘿𝙄𝙊𝙎𑁍ꥈ࣪⬪'; 
    
    let groupSize = participants.length;
    if (m.messageStubType == 27) {
        groupSize++;
    } else if (m.messageStubType == 28 || m.messageStubType == 32) {
        groupSize--;
    }

    if (chat.welcome && m.messageStubType == 27) {
        let bienvenida = bot.welcome || `❀ *Bienvenido* a ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split('@')[0]}\n${global.welcom1}\n✦ Ahora somos ${groupSize} Miembros.\n•(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`;
        await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, null);
    }
    
    if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
        let bye = bot.bye || `❀ *Adiós* de ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split('@')[0]}\n${global.welcom2}\n✦ Ahora somos ${groupSize} Miembros.\n•(=^●ω●^=)• Te esperamos pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`;
        await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, null);
    }
}
