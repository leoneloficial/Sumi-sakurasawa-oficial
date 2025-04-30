import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

if (!text) return conn.reply(m.chat, `${emoji} Por favor, ingresa una busqueda de Youtube.`, m)

conn.reply(m.chat, wait, m)

let results = await yts(text)
let tes = results.all
let teks = results.all.map(v => {
switch (v.type) {
case 'video': return `「✦」Resultados de la búsqueda para *<${text}>*

> 「✦」 Título » *${v.title}*


> ✦ Canal » *${v.author.name}*
> ⴵ Duración » *${v.timestamp}*
> ✐ Subido » *${v.ago}*
> ✰ Vistas » *${v.views}*
> 🜸 Enlace » ${v.url}`}}).filter(v => v).join('\n\n••••••••••••••••••••••••••••••••••••\n\n')

conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, fkontak, m)

}
handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['ytbuscar', 'ytsearch', 'yts']
handler.register = true
handler.coin = 1

export default handler