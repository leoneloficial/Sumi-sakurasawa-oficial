import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Ingresa un texto para generar un sticker')

  m.react('🕒️')
  let url = `https://api.siputzx.my.id/api/m/brat?text=${text}&isVideo=false&delay=500`
  let buffer = await axios.get(url, { responseType: 'arraybuffer' })
  await conn.sendFile(m.chat, buffer.data, 'sticker.webp', '', m, true)
  m.react('✅')
}

handler.command = ['brat']
handler.tags = ['sticker']
handler.help = ['brat <texto>']

export default handler