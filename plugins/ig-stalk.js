const axios = require('axios');

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('> Ingresa el nombre de usuario de Instagram que deseas stalkear');

  try {
    const username = args[0].replace(/^@/, '');
    const response = await axios.get(`https://api.lolhuman.xyz/api/stalkig/${username}?apikey=${lolkeysapi}`);
    const data = response.data;

    if (data.status === 200) {
      const info = `Información del usuario: ${username}\n\n`;
      info += `Nombre: ${data.result.fullname}\n`;
      info += `Seguidores: ${data.result.followers}\n`;
      info += `Seguidos: ${data.result.following}\n`;
      info += `Publicaciones: ${data.result.posts}\n`;
      info += `Biografía: ${data.result.bio}\n`;

      await conn.sendMessage(m.chat, { text: info }, { quoted: m });
      await conn.sendMessage(m.chat, { image: { url: data.result.photo_profile }, caption: 'Foto de perfil' }, { quoted: m });
    } else {
      m.reply('Error al obtener la información del usuario');
    }
  } catch (error) {
    console.error('Error:', error.message);
    m.reply('Error al obtener la información del usuario');
  }
};

handler.help = ['igstalk'].map(v => v + ' <username>');
handler.tags = ['herramientas'];
handler.command = ['igstalk']

export default handler;