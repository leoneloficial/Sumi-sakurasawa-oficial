//Actualizado 

import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*──────────────── GLOBAL SETTINGS ────────────────*

global.botNumber = ''; // Ejemplo: 573218138672

//*──────────────── OWNER SETTINGS ────────────────*
global.owner = [
    ['393715279301', '🜲 Propietario 🜲', true],
    ['59169739411']
    ['584146277368']
];

global.mods = [];
global.suittag = ['393715279301'];
global.prems = [];

//*──────────────── BOT INFORMATION ────────────────*

global.libreria = 'Baileys';
global.baileys = 'V 6.7.16';
global.vs = '2.2.0';
global.nameqr = 'YukiBot-MD';
global.namebot = '✿◟Yυƙι-Sυσυ-Bσƚ◞✿';
global.sessions = 'Sessions';
global.jadi = 'JadiBots';
global.yukiJadibts = true;

//*──────────────── BOT CUSTOMIZATION ────────────────*

global.packname = '⪛✰ sᥙmі - ᑲ᥆𝗍 ✰⪜';
global.botname = 'Sumi Sakurasawa';
global.author = 'Made By ✨ Leo ✨';
global.dev = 'Powered by Sunflare ☂︎ Team';
global.textbot = 'Sumi Sakurasawa • Powered by Leo';

//*──────────────── IMAGES & LINKS ────────────────*

global.banner = 'https://files.catbox.moe/a10h2o.jpg';
global.avatar = 'https://files.catbox.moe/a10h2o.jpg';
global.catalogo = fs.readFileSync('./src/catalogo.jpg');

//*──────────────── GROUPS & CHANNELS ────────────────*

global.gp1 = 'https://chat.whatsapp.com/CDw7hpI30WjCyKFAVLHNhZ';
global.comunidad1 = 'https://chat.whatsapp.com/I0dMp2fEle7L6RaWBmwlAa';
global.channel = 'https://whatsapp.com/channel/0029Vagdmfv1SWt5nfdR4z3w';
global.md = 'https://github.com/The-King-Destroy/Yuki_Suou-Bot';
global.correo = 'thekingdestroy507@gmail.com';

//*──────────────── MULTIPLIERS & SETTINGS ────────────────*

global.multiplier = 70;

//*──────────────── LIBRARIES ────────────────*
global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

//*──────────────── AUTO UPDATE ────────────────*
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
    unwatchFile(file);
    console.log(chalk.redBright("⚠️ 'config.js' actualizado automáticamente!"));
    import(`${file}?update=${Date.now()}`);
});