import { createCanvas, registerFont } from 'canvas';
import { readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

// For dynamic imports
let loadImage;
import('canvas').then(mod => {
  loadImage = mod.loadImage;
});


try {
  registerFont(join(process.cwd(), 'fonts', 'NotoColorEmoji.ttf'), {
    family: 'Noto Color Emoji'
  });
  registerFont(join(process.cwd(), 'fonts', 'NotoSans-Regular.ttf'), {
    family: 'Noto Sans'
  });
} catch (e) {
  console.log('No se encontraron fuentes personalizadas, usando fuentes por defecto');
}

const flagMap = [
  ['598', '🇺🇾'], ['595', '🇵🇾'], ['593', '🇪🇨'], ['591', '🇧🇴'],
  ['590', '🇧🇶'], ['509', '🇭🇹'], ['507', '🇵🇦'], ['506', '🇨🇷'],
  ['505', '🇳🇮'], ['504', '🇭🇳'], ['503', '🇸🇻'], ['502', '🇬🇹'],
  ['501', '🇧🇿'], ['599', '🇨🇼'], ['597', '🇸🇷'], ['596', '🇬🇫'],
  ['594', '🇬🇫'], ['592', '🇬🇾'], ['590', '🇬🇵'], ['549', '🇦🇷'],
  ['58', '🇻🇪'], ['57', '🇨🇴'], ['56', '🇨🇱'], ['55', '🇧🇷'],
  ['54', '🇦🇷'], ['53', '🇨🇺'], ['52', '🇲🇽'], ['51', '🇵🇪'],
  ['34', '🇪🇸'], ['1', '🇺🇸']
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

// Función para dividir texto conservando emojis
function splitTextWithEmojis(text, maxWidth, ctx) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

const handler = async (msg, { conn, args }) => {
  if (!loadImage) {
    const canvasModule = await import('canvas');
    loadImage = canvasModule.loadImage;
  }

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

  let content = '';
  if (colores[firstWord]) {
    const afterColor = contentFull.split(' ').slice(1).join(' ').trim();
    content = afterColor || quotedText || '';
  } else {
    content = contentFull || quotedText || '';
  }

  if (!content || content.length === 0) {
    return conn.sendMessage(chatId, {
      text: `✏️ Usa el comando así:\n\n*.texto [color opcional] tu mensaje*\n\nEjemplos:\n- .texto azul Hola grupo\n- .texto Buenos días a todos\n\nColores disponibles:\nazul, rojo, verde, rosa, morado, negro, naranja, gris, celeste`
    }, { quoted: msg });
  }

  const displayName = await niceName(targetJid, conn, chatId, quotedName, fallbackPN);

  let avatarUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
  try {
    avatarUrl = await conn.profilePictureUrl(targetJid, 'image');
  } catch {}

  await conn.sendMessage(chatId, { react: { text: '🖼️', key: msg.key } });

  const canvas = createCanvas(1080, 1080);
  const draw = canvas.getContext('2d');

  // Configurar fuentes (intentar usar Noto Color Emoji si está disponible)
  const fontFamily = 'Noto Color Emoji, Noto Sans, Sans-serif';
  
  const grad = draw.createLinearGradient(0, 0, 1080, 1080);
  grad.addColorStop(0, gradColors[0]);
  grad.addColorStop(1, gradColors[1]);
  draw.fillStyle = grad;
  draw.fillRect(0, 0, 1080, 1080);

  const avatar = await loadImage(avatarUrl);
  draw.save();
  draw.beginPath();
  draw.arc(100, 100, 80, 0, Math.PI * 2);
  draw.clip();
  draw.drawImage(avatar, 20, 20, 160, 160);
  draw.restore();

  // Nombre con emojis
  draw.font = `bold 40px ${fontFamily}`;
  draw.fillStyle = '#ffffff';
  draw.textAlign = 'left';
  draw.fillText(displayName, 220, 100);

  // Texto principal con emojis
  draw.font = `bold 60px ${fontFamily}`;
  draw.fillStyle = '#ffffff';
  draw.textAlign = 'center';

  // Usar nuestra función mejorada para dividir texto
  const lines = splitTextWithEmojis(content, 900, draw);

  const startY = 550 - (lines.length * 35);
  lines.forEach((line, i) => {
    draw.fillText(line, 540, startY + (i * 80));
  });

  const logo = await loadImage('https://files.catbox.moe/2oxo4b.jpg');
  const logoWidth = 140;
  const logoHeight = 140;
  const x = canvas.width - logoWidth - 40;
  const y = canvas.height - logoHeight - 40;
  draw.drawImage(logo, x, y, logoWidth, logoHeight);

  const fileName = join(process.cwd(), 'tmp', `texto-${Date.now()}.png`);
  const buffer = canvas.toBuffer('image/png');
  
  await conn.sendMessage(chatId, {
    image: buffer,
    caption: `🖼 imagen generada`
  }, { quoted: msg });
};

handler.command = ['texto'];
export default handler;
