let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  const defaultWelcome = '❀ *Bienvenido* a %group\n✰ @user\n%text\n✦ Ahora somos %members Miembros.\n•(=^●ω●^=)• Disfruta tu estadía en el grupo!';

  if (!text) {
    global.db.data.chats[m.chat].sWelcome = defaultWelcome;
    const preview = defaultWelcome
      .replace(/@user/g, `@${m.sender.split('@')[0]}`)
      .replace('%group', await conn.getName(m.chat))
      .replace('%text', global.welcom1 || '')
      .replace('%members', (await conn.groupMetadata(m.chat)).participants.length);
    return conn.reply(m.chat, `✅ *Mensaje de bienvenida establecido:*\n\n${preview}`, m);
  }

  const fullWelcome = text.includes('@user') ? text : `${defaultWelcome}\n\n${text.trim()}`;
  global.db.data.chats[m.chat].sWelcome = fullWelcome;

  const preview = fullWelcome
    .replace(/@user/g, `@${m.sender.split('@')[0]}`)
    .replace('%group', await conn.getName(m.chat))
    .replace('%text', global.welcom1 || '')
    .replace('%members', (await conn.groupMetadata(m.chat)).participants.length);

  conn.reply(m.chat, `✅ *Mensaje de bienvenida actualizado:*\n\n${preview}`, m);
};

handler.help = ['setwelcome <texto>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.owner = false;
handler.admin = true;
handler.group = true;

export default handler;
