let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  // Configuración base de la bienvenida
  const defaultWelcome = 'Bienvenid@ al grupo @user';
  
  // Si no hay texto adicional, se usa solo la bienvenida base
  if (!text) {
    global.db.data.settings[conn.user.jid].welcome = defaultWelcome;
    return m.reply(`${emoji} Se ha establecido la bienvenida predeterminada:\n\n${defaultWelcome.replace('@user', '@' + m.sender.split('@')[0])}`);
  }
  
  // Combinar la bienvenida base con el texto proporcionado
  const fullWelcome = `${defaultWelcome}\n\n${text.trim()}`;
  global.db.data.settings[conn.user.jid].welcome = fullWelcome;
  
  m.reply(`${emoji} La bienvenida se ha actualizado correctamente:\n\n${fullWelcome.replace('@user', '@' + m.sender.split('@')[0])}`);
};

handler.help = ['setwelcome <texto>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.owner = false;
handler.admin = true;
handler.group = true;

export default handler;
