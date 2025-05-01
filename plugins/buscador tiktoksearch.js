import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) {
        await conn.reply(m.chat, `❀ Ingresa el texto de lo que quieres buscar`, m);
        return;
    }
    
    try {
        let loadingMsg = await conn.sendMessage(m.chat, { text: '❀ Buscando en TikTok...' }, { quoted: m });
        
        let api = await fetch(`https://api.agatz.xyz/api/tiktoksearch?message=${encodeURIComponent(text)}`);
        if (!api.ok) throw new Error(`API request failed with status ${api.status}`);
        
        let json = await api.json();
        if (!json.data) throw new Error('No data received from API');
        
        let { title, no_watermark, music } = json.data;
        
        await conn.sendMessage(m.chat, { delete: loadingMsg.key });
        
        await conn.sendFile(m.chat, no_watermark, 'tiktok_video.mp4', 
            `「✦」 *${title || 'Video de TikTok'}*\n\n` +
            `> ✦ *Búsqueda:* ${text}\n` +
            `> 🜸 *Música:* Se enviará aparte`, 
            m);
            
        if (music) {
            await conn.sendFile(m.chat, music, 'tiktok_music.mp3', null, m, true, { mimetype: 'audio/mp4' });
        }
        
    } catch (error) {
        console.error('TikTok Search Error:', error);
        await conn.reply(m.chat, 
            `❌ Error al buscar en TikTok\n` +
            `🔹 Intenta nuevamente más tarde\n` +
            `🔹 O usa otro término de búsqueda`, 
            m);
    }
};

handler.help = ['tiktoksearch <txt>'];
handler.tags = ['buscador'];
handler.command = ['tiktoksearch', 'ttss', 'tiktoks'];
handler.group = true;
handler.limit = true;
handler.register = true;
handler.coin = 2;

export default handler;
