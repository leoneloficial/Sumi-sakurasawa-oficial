import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  let bot = global.db.data.settings[conn.user.jid]
  
  if (!m.messageStubType || !m.isGroup) return !0;
  
  
  let pp = bot.logo.welcome || await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/un7lt7.jpg')
  let img = await (await fetch(pp)).buffer()
  let chat = global.db.data.chats[m.chat]
  let groupName = groupMetadata.subject
  let groupSize = participants.length
  
  
  if (m.messageStubType == 27) { 
    groupSize++
  } else if (m.messageStubType == 28 || m.messageStubType == 32) { // Salida
    groupSize--
  }


  if (chat.welcome && m.messageStubType == 27) {
    let user = m.messageStubParameters[0]
    let username = '@' + user.split('@')[0]
    
    
    let welcomeMsg = chat.sWelcome || `❀ *Bienvenido* a %group\n✰ @user\n%text\n✦ Ahora somos %members Miembros.\n•(=^●ω●^=)• Disfruta tu estadía en el grupo!`
    
    // Reemplazar variables
    let finalMsg = welcomeMsg
      .replace(/@user/g, username)
      .replace('%group', groupName)
      .replace('%text', global.welcom1 || '')
      .replace('%members', groupSize)
    
    
    await conn.sendMessage(m.chat, {
      text: finalMsg,
      mentions: [user]
    }, { quoted: m })
    
    
    await conn.sendFile(m.chat, img, 'welcome.jpg', '', m, false, { mentions: [user] })
  }

  
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let user = m.messageStubParameters[0]
    let username = '@' + user.split('@')[0]
    
    let byeMsg = chat.sBye || `❀ *Adiós* de %group\n✰ @user\n%text\n✦ Ahora somos %members Miembros.\n•(=^●ω●^=)• Te esperamos pronto!`
    
    let finalMsg = byeMsg
      .replace(/@user/g, username)
      .replace('%group', groupName)
      .replace('%text', global.welcom2 || '')
      .replace('%members', groupSize)
    
    await conn.sendMessage(m.chat, {
      text: finalMsg,
      mentions: [user]
    }, { quoted: m })
  }
}
