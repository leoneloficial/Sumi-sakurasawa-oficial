import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("❀ Ingresa un enlace válido de YouTube.\nEjemplo: .ytmp4 https://www.youtube.com/watch?v=dQw4w9WgXcQ");

  try {
    let apiUrl = `https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(text)}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (!data?.result?.download?.url) {
      return m.reply("❌ No se pudo obtener el video. Verifica el enlace.");
    }
    await conn.sendMessage(m.chat, {
      video: { url: data.result.download.url },
      caption: `✦ *Título:* ${data.result.title || "Sin título"}\n> ❏ *Tamaño:* ${data.result.HumanReadable || "Desconocido"}\n> 🜸 *Enlace directo:* ${text}`
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    console.error(error);
    await m.reply(`❌ Error al procesar la solicitud:\n${error.message}`);
  }
};

handler.command = ["ytmp4"];
handler.help = ["ytmp4 <enlace>"];
handler.tags = ["download"];

export default handler;