import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

const flagMap = [
  ['598', '🇺🇾'],
  ['595', '🇵🇾'],
  ['593', '🇪🇨'],
  ['591', '🇧🇴'],
  ['590', '🇧🇶'],
  ['509', '🇭🇹'],
  ['507', '🇵🇦'],
  ['506', '🇨🇷'],
  ['505', '🇳🇮'],
  ['504', '🇭🇳'],
  ['503', '🇸🇻'],
  ['502', '🇬🇹'],
  ['501', '🇧🇿'],
  ['599', '🇨🇼'],
  ['597', '🇸🇷'],
  ['596', '🇬🇫'],
  ['592', '🇬🇾'],
  ['58', '🇻🇪'],
  ['57', '🇨🇴'],
  ['56', '🇨🇱'],
  ['55', '🇧🇷'],
  ['54', '🇦🇷'],
  ['53', '🇨🇺'],
  ['52', '🇲🇽'],
  ['51', '🇵🇪'],
  ['34', '🇪🇸'],
  ['1', '🇺🇸']
];

function numberWithFlag(num) {
  const clean = num.replace(/[^0-9]/g, '');
  for (const [code, flag] of flagMap) {
    if (clean.startsWith(code)) return `${num} ${flag}`;
  }
  return num;
}

const quotedPush = q => (q?.pushName || q?.sender?.pushName || '');

async function niceName(jid, conn, chatId, qPush, fallback = '') {
  if (qPush && qPush.trim() && !/^\d+$/.test(qPush)) return qPush;
  if (chatId.endsWith('@g.us')) {
    try {
      const meta = await conn.groupMetadata(chatId);
      const p = meta.participants.find(p => p.id === jid);
      const n = p?.notify || p?.name;
      if (n && n.trim() && !/^\d+$/.test(n)) return n;
    } catch {}
  }
  try {
    const g = await conn.getName(jid);
    if (g && g.trim() && !/^\d+$/.test(g) && !g.includes('@')) return g;
  } catch {}
  const c = conn.contacts?.[jid];
  if (c?.notify && !/^\d+$/.test(c.notify)) return c.notify;
  if (c?.name && !/^\d+$/.test(c.name)) return c.name;
  if (fallback && fallback.trim() && !/^\d+$/.test(fallback)) return fallback;
  return numberWithFlag(jid.split('@')[0]);
}

const colores = {
  rojo: ['#F44336', '#FFCDD2'],
  azul: ['#00B4DB', '#0083B0'],
  verde: ['#4CAF50', '#C8E6C9'],
  rosa: ['#E91E63', '#F8BBD0'],
  morado: ['#9C27B0', '#E1BEE7'],
  negro: ['#212121', '#9E9E9E'],
  naranja: ['#FF9800', '#FFE0B2'],
  gris: ['#607D8B', '#CFD8DC'],
  celeste: ['#00FFFF', '#E0FFFF']
};

const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const context = msg.message?.extendedTextMessage?.contextInfo;
  const quotedMsg = context?.quotedMessage;
  let targetJid = msg.key.participant || msg.key.remoteJid;
  let fallbackPN = msg.pushName || '';
  let quotedName = '';
  let quotedText = '';
  
  if (quotedMsg && context?.participant) {
    targetJid = context.participant;
    quotedText = quotedMsg.conversation || quotedMsg.extendedTextMessage?.text || '';
    quotedName = quotedPush(quotedMsg);
    fallbackPN = '';
  }
  
  const contentFull = (args.join(' ').trim() || '').trim();
  const firstWord = contentFull.split(' ')[0].toLowerCase();
  const gradColors = colores[firstWord] || colores['azul'];
  
  // ... (resto del código para generar la imagen)

  // Envía la imagen generada
  await conn.sendMessage(chatId, {
    image: fs.readFileSync(`path/to/image.png`),
    caption: `Texto generado`
  });
};

handler.help = ['texto'];
handler.tags = ['herramientas'];
handler.command = ['texto'];
handler.register = true;

export default handler;
