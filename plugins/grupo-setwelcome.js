let handler = async (m, { conn, text }) => {

  const defaultWelcome = 'Bienvenid@ al grupo @user';
  
  if (!text) {
    global.db.data.settings[conn.user.jid].welcome = defaultWelcome;
    // Mensaje de confirmación con mención de prueba
    const confirmation = `${emoji} Bienvenida establecida:\n\n${defaultWelcome.replace('@user', '@' + m.sender.split('@')[0])}`;
    return conn.sendMessage(m.chat, { 
      text: confirmation,
      mentions: [m.sender]
    }, { quoted: m });
  }
  
  const customWelcome = `${defaultWelcome}\n\n${text.trim()}`;
  global.db.data.settings[conn.user.jid].welcome = customWelcome;
  
  const confirmation = `${emoji} Bienvenida personalizada establecida:\n\n${
    customWelcome.replace('@user', '@' + m.sender.split('@')[0])
  }`;
  
  await conn.sendMessage(m.chat, { 
    text: confirmation,
    mentions: [m.sender]
  }, { quoted: m });
};

const sendWelcome = async (conn, chat, user) => {
  const welcomeMsg = global.db.data.settings[conn.user.jid].welcome || 'Bienvenid@ al grupo @user';
  const formattedMsg = welcomeMsg.replace('@user', '@' + user.split('@')[0]);
  
  await conn.sendMessage(chat, {
    text: formattedMsg,
    mentions: [user]
  });
};

handler.help = ['setwelcome <texto>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.owner = false;
handler.admin = true;
handler.group = true;

export { handler, sendWelcome };
