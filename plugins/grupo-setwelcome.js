let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  const defaultWelcome = 'Bienvenid@ al grupo @user';
  
  if (!text) {
    global.db.data.chats[m.chat].sWelcome = defaultWelcome;
    const preview = defaultWelcome.replace(/@user/g, `@${m.sender.split('@')[0]}`);
    return m.reply(`✅ Se ha establecido la bienvenida predeterminada:\n\n${preview}`);
  }
  
  // Asegurarse de que el texto tenga al menos un @user para reemplazar
  const fullWelcome = text.includes('@user') ? text : `${defaultWelcome}\n\n${text.trim()}`;
  global.db.data.chats[m.chat].sWelcome = fullWelcome;
  
  const preview = fullWelcome.replace(/@user/g, `@${m.sender.split('@')[0]}`);
  m.reply(`✅ La bienvenida se ha actualizado correctamente:\n\n${preview}`);
};

/*
async function onParticipantUpdate({ jid, participants, action }) {
  if (action === 'add') {
    const welcomeMsg = global.db.data.chats[jid]?.sWelcome || 'Bienvenid@ al grupo @user';
    participants.forEach(async (user) => {
      const mention = '@' + user.split('@')[0];
      const finalMsg = welcomeMsg.replace(/@user/g, mention);
      conn.sendMessage(jid, { text: finalMsg, mentions: [user] });
    });
  }
}
*/

handler.help = ['setwelcome <texto>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.owner = false;
handler.admin = true;
handler.group = true;

export default handler;
