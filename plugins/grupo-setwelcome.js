let handler = async (m, { conn, text }) => {
  if (!m.isGroup) return m.reply(`${emoji} Este comando solo funciona en grupos`);
  
  
  const baseWelcome = 'Bienvenid@ al grupo @user';
  

  const fullWelcome = text ? `${baseWelcome}\n\n${text.trim()}` : baseWelcome;
  

  if (!global.db.data.settings) global.db.data.settings = {};
  global.db.data.settings[conn.user.jid] = { welcome: fullWelcome };
  
  
  const preview = fullWelcome.replace('@user', `@${m.sender.split('@')[0]}`);
  
  await conn.sendMessage(m.chat, {
    text: `${emoji} *Previsualización de la bienvenida:*\n\n${preview}`,
    mentions: [m.sender]
  }, { quoted: m });
};


const sendWelcome = async (conn, chatId, userId) => {
  const welcomeText = global.db.data.settings[conn.user.jid]?.welcome || 'Bienvenid@ al grupo @user';
  const formattedWelcome = welcomeText.replace('@user', `@${userId.split('@')[0]}`);
  
  await conn.sendMessage(chatId, {
    text: formattedWelcome,
    mentions: [userId]
  });
};

handler.help = ['setwelcome <texto>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.group = true;

export { handler, sendWelcome };
