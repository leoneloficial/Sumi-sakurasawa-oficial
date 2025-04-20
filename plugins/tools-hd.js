import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

export const handler = async (m, { conn, usedPrefix, command }) => {
  // Se intenta detectar la imagen: si el mensaje es una respuesta, se toma m.quoted;
  // de lo contrario, se toma el propio mensaje m.
  const msgData = m.quoted || m
  
  // Verificar si existe el mimetype y que sea una imagen (JPG o PNG).
  // Algunos bots pueden tener el mimetype directamente en msgData
  const mime = msgData.mimetype || (msgData.msg ? msgData.msg.mimetype : '')
  if (!mime || !/image\/(jpe?g|png)/.test(mime)) {
    throw `❀ Debes enviar o responder a una imagen válida (JPG/PNG) con: ${usedPrefix + command}`
  }

  // Descargar los datos de la imagen
  const imageData = await msgData.download()
  if (!imageData) throw "❌ No se pudo descargar la imagen."

  // Subir la imagen a un servidor para obtener una URL pública
  const imageUrl = await uploadImage(imageData)

  // Construir la URL de la API codificando el parámetro de la imagen
  const apiUrl = `https://api.siputzx.my.id/api/iloveimg/upscale?image=${encodeURIComponent(imageUrl)}`

  // Se envía una reacción (por ejemplo, "procesando")
  await conn.sendMessage(m.chat, { react: { text: '⌛', key: m.key } })

  try {
    // Se envía la imagen procesada por la API
    await conn.sendMessage(m.chat, {
      image: { url: apiUrl },
      caption: `*「✦」 HD Completado*\n\n❀ Tu imagen se ha mejorado con éxito.`
    }, { quoted: m })
    // Reacción final de confirmación
    await conn.sendMessage(m.chat, { react: { text: '🧧', key: m.key } })
  } catch (err) {
    throw `❌ Error al procesar la imagen.\n\n${err}`
  }
}

handler.command = ["remini", "hd", "enhance"];
export default handler