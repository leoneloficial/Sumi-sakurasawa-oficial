import Jimp from 'jimp';

let handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, `${emoji} Por favor, responde a una imagen para cambiar la foto de perfil.`, m, rcanal);

  try {
    const media = await m.quoted.download();
    if (!media) return conn.reply(m.chat, `${emoji2} No se pudo obtener la imagen.`, m, rcanal);

    const image = await Jimp.read(media);
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    await conn.updateProfilePicture(conn.user.jid, buffer);
    return conn.reply(m.chat, `${emoji} Foto de perfil cambiada con éxito.`, m, rcanal);
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `${msm} Ocurrió un error al intentar cambiar la foto de perfil.`, m, rcanal);
  }
};

handler.help = ['setimage'];
handler.tags = ['owner'];
handler.command = ['setpfp', 'setimage'];

export default handler;