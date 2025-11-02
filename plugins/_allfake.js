// plugins/_allfake.js
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import axios from 'axios'
import speed from 'performance-now'
import * as nodeCrypto from 'crypto' // gunakan nodeCrypto agar tidak konflik

let handler = m => m

handler.all = async function (m) {
  const sock = this // sesuai Baileys v7
  const name = await sock.getName(m.sender)
  let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
  const fotonyu = 'https://telegra.ph/file/e1047817d256d9e372144.jpg'

  try {
    pp = await sock.profilePictureUrl(m.sender, 'image')
  } catch (e) { }

  // ================== GLOBAL VARIABEL ==================
  global.emror = 'https://telegra.ph/file/a6294049a1863a69154cf.jpg'
  global.doc = pickRandom([
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/msword",
    "application/pdf"
  ])
  global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000])

  // Modul Global
  global.axios = axios
  global.fetch = fetch
  global.cheerio = (await import('cheerio')).default
  global.fs = fs
  global.nodeCrypto = nodeCrypto

  const timestamp = speed()
  const latensi = speed() - timestamp
  const ms = latensi.toFixed(4)
  const _uptime = process.uptime() * 1000

  // Owner Contact
  global.kontak2 = [
    ['6282285357346@s.whatsapp.net', await sock.getName('6282285357346@s.whatsapp.net'), 'Tio', 'https://whatsapp.com', true]
  ]

  // fkon (fake contact)
  global.fkon = {
    key: {
      fromMe: false,
      participant: m.sender,
      ...(m.chat ? { remoteJid: m.chat } : {})
    },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    }
  }

  // Pesan sementara
  global.ephemeral = '86400'

  global.ucapan = ucapan()
  global.botdate = date()

  // ====== External AdReply (Baileys 7 style) ======
  global.adReply = {
    contextInfo: {
      externalAdReply: {
        title: global.info?.namebot || 'NightMare MD',
        body: global.ucapan || 'Selamat datang!',
        thumbnailUrl: global.url?.logo || fotonyu,
        sourceUrl: 'https://nightmare.bot.whatsapp.md',
        mediaType: 1, // 1=Photo, 2=Video
        renderLargerThumbnail: true,
      }
    }
  }

  // ====== Fake IG ======
  global.fakeig = {
    contextInfo: {
      externalAdReply: {
        title: global.info?.namebot || 'NightMare MD',
        body: global.ucapan || 'Selamat datang!',
        thumbnailUrl: pp,
        sourceUrl: global.url?.sig || 'https://instagram.com/nightmarebot',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }
}

export default handler

// ================== Helper Functions ==================
function date() {
  let d = new Date(new Date() + 3600000)
  let locale = 'id'
  let week = d.toLocaleDateString(locale, { weekday: 'long' })
  let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  return `${week}, ${date}`
}

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = 'Selamat malam'
  if (time >= 4 && time < 11) res = 'Selamat pagi'
  else if (time >= 11 && time < 15) res = 'Selamat siang'
  else if (time >= 15 && time < 18) res = 'Selamat sore'
  else if (time >= 18) res = 'Selamat malam'
  return res
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}