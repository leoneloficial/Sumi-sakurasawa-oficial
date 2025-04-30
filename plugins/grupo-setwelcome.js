let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  
  const defaultWelcome = 'Bienvenid@ al grupo @user';
  
  if (!text) {
    global.db.data.chats[m.chat].sWelcome = defaultWelcome;
    return m.reply(`✅ Se ha establecido la bienvenida predeterminada:\n\n${defaultWelcome.replace('@user', '@' + m.sender.split('@')[0])}`);
  }
  
  const fullWelcome = text.includes('@user') ? text : `${defaultWelcome}\n\n${text.trim()}`;
  global.db.data.chats[m.chat].sWelcome = fullWelcome;
  
  m.reply(`✅ La bienvenida se ha actualizado correctamente:\n\n${fullWelcome.replace('@user', '@' + m.sender.split('@')[0])}`);
};

handler.help = ['setwelcome <texto>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.owner = false;
handler.admin = true;
handler.group = true;

export default handler;
