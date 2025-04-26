import fetch from "node-fetch";
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `❀ Ejemplo de uso: ${usedPrefix + command} https://youtube.com/watch?v=Hx920thF8X4`, m);
    }

    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) {
      return m.reply(`Enlace inválido`);
    }

    m.react('🌸');
    let json = await ytdl(args[0]);
    let limit = 10485760;
    let size = await getSize(json.url);

    const cap = `*「✦」 : ${json.title}*
\n> ❒ Peso: ${await formatSize(size) || "Desconocido"}\n> 🜸 URL: ${args[0]}`;

    conn.sendFile(m.chat, await (await fetch(json.url)).buffer(), `${json.title}.mp4`, cap, m, null, { asDocument: true, mimetype: "video/mp4" });

    m.react('☑️');
  } catch (e) {
    m.reply(e);
  }
};

handler.help = ['ytmp4'];
handler.command = ['ytv2', 'ytmp4', 'ytv'];
handler.tags = ['dl'];
handler.diamond = true;

export default handler;

async function ytdl(url) {
  const res = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`);
  const data = await res.json();

  if (data.status !== 200 || !data.result?.download?.url) {
    throw new Error('Error al obtener el video');
  }

  return {
    url: data.result.download.url,
    title: data.result.metadata.title
  };
}

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  bytes = Number(bytes);

  if (isNaN(bytes)) {
    return 'Tamaño de bytes inválido';
  }

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
  try {
    const response = await axios.head(url);
    const contentLength = response.headers['content-length'];
    return contentLength ? parseInt(contentLength, 10) : null;
  } catch (error) {
    return error;
  }
}