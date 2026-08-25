import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT = join(process.cwd(), 'public', 'images')

let seed = 42
function rnd(a = 0, b = 1) {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff
  return a + (seed / 0x7fffffff) * (b - a)
}
function pick(arr) {
  return arr[Math.floor(rnd(0, arr.length))]
}

const NAVY = ['#050d16', '#081625', '#0a1b2e', '#0d2138', '#102a47']
const GOLD = ['#d4af37', '#e6c65c', '#b8912b', '#f0d77b', '#c9a227']

function gradient(w, h, top, bottom) {
  return `<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/>
</linearGradient>`
}

function vignette(w, h) {
  return `<radialGradient id="vig" cx="50%" cy="45%" r="75%">
  <stop offset="60%" stop-color="#000" stop-opacity="0"/>
  <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
</radialGradient><rect width="${w}" height="${h}" fill="url(#vig)"/>`
}

function noise(w, h) {
  let pts = ''
  const n = Math.floor((w * h) / 900)
  for (let i = 0; i < n; i++) {
    pts += `<circle cx="${rnd(0, w)}" cy="${rnd(0, h)}" r="${rnd(0.3, 1.1)}" fill="#fff" opacity="${rnd(0.02, 0.06)}"/>`
  }
  return pts
}

function stars(w, h) {
  let pts = ''
  const n = Math.floor(w * h / 4000)
  for (let i = 0; i < n; i++) {
    pts += `<circle cx="${rnd(0, w)}" cy="${rnd(0, h * 0.6)}" r="${rnd(0.4, 1.4)}" fill="${pick(GOLD)}" opacity="${rnd(0.15, 0.7)}"/>`
  }
  return pts
}

function goldParticles(w, h) {
  let pts = ''
  const n = 14
  for (let i = 0; i < n; i++) {
    const r = rnd(1.2, 3.2)
    pts += `<circle cx="${rnd(0, w)}" cy="${rnd(0, h)}" r="${r}" fill="${pick(GOLD)}" opacity="${rnd(0.25, 0.75)}" filter="url(#blur)"/>`
  }
  return pts
}

function sunGlow(w, h, cx, cy, r, color = GOLD[0]) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.22" filter="url(#blur)"/>
<circle cx="${cx}" cy="${cy}" r="${r * 0.45}" fill="${color}" opacity="0.4" filter="url(#blur)"/>
<circle cx="${cx}" cy="${cy}" r="${r * 0.16}" fill="${color}" opacity="0.9"/>`
}

function skyline(w, h, horizon, opts = {}) {
  const color = opts.color || 'rgba(212,175,55,'
  const winChance = opts.winChance ?? 0.5
  const bldChance = opts.bldChance ?? 0.85
  let out = ''
  let x = -10
  while (x < w + 20) {
    const bw = rnd(60, 160)
    const bh = rnd(h * 0.12, h * 0.5) * (opts.tall ? 1.4 : 1)
    const top = horizon - bh
    out += `<rect x="${x}" y="${top}" width="${bw}" height="${bh + 4}" fill="${pick(NAVY)}" opacity="${rnd(0.75, 1)}"/>`
    if (rnd() < bldChance) {
      const cols = Math.floor(bw / rnd(14, 22))
      const rows = Math.floor(bh / rnd(18, 30))
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (rnd() < winChance) {
            out += `<rect x="${x + 6 + i * (bw - 10) / cols}" y="${top + 8 + j * (bh - 14) / rows}" width="${(bw - 10) / cols - 3}" height="${(bh - 14) / rows - 3}" fill="${color}${rnd(0.12, 0.55).toFixed(2)})"/>`
          }
        }
      }
    }
    if (rnd() < 0.5) {
      const ah = bh * 0.6
      const ax = x + bw / 2
      out += `<g stroke="${color}0.35)" stroke-width="1" fill="none" opacity="0.5">
<line x1="${ax}" y1="${top}" x2="${ax}" y2="${top - ah}"/>
<line x1="${ax}" y1="${top - ah}" x2="${ax - 8}" y2="${top - ah + 26}"/>
<line x1="${ax}" y1="${top - ah + 26}" x2="${ax + 8}" y2="${top - ah + 10}"/>
</g>`
    }
    x += bw + rnd(2, 30)
  }
  return out
}

function buildingCutaway(w, h, opts = {}) {
  const floorH = opts.floorH || 62
  const floors = Math.floor(h / floorH)
  let out = `<rect x="${w * 0.18}" y="${h * 0.1}" width="${w * 0.64}" height="${h * 0.9}" fill="#0a1b2e" stroke="${GOLD[0]}55" stroke-width="1.5"/>`
  for (let i = 0; i < floors; i++) {
    const y = h * 0.1 + i * floorH + floorH / 2
    out += `<line x1="${w * 0.18}" y1="${y}" x2="${w * 0.82}" y2="${y}" stroke="${GOLD[0]}22" stroke-width="1"/>`
  }
  for (let f = 1; f < floors; f++) {
    const y = h * 0.1 + f * floorH
    const cells = 3
    for (let c = 0; c < cells; c++) {
      const x = w * 0.18 + 10 + c * ((w * 0.64 - 20) / cells)
      if (rnd() < 0.6) {
        out += `<rect x="${x + 2}" y="${y + 4}" width="${(w * 0.64 - 20) / cells - 6}" height="${floorH - 10}" fill="${pick(GOLD)}${rnd(0.1, 0.4).toFixed(2)})"/>`
      } else {
        out += `<rect x="${x + 2}" y="${y + 4}" width="${(w * 0.64 - 20) / cells - 6}" height="${floorH - 10}" fill="none" stroke="#c9a22744" stroke-width="1"/>`
      }
    }
  }
  out += `<rect x="${w * 0.2}" y="${h * 0.12}" width="${w * 0.6}" height="14" fill="${GOLD[0]}cc"/>`
  return out
}

function interior(w, h, opts = {}) {
  const wall = opts.wall || '#0d2138'
  const accent = pick(GOLD)
  let out = ''
  out += `<rect x="0" y="0" width="${w}" height="${h * 0.62}" fill="${wall}"/>`
  out += `<rect x="0" y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="#081625"/>`
  out += `<path d="M0 ${h * 0.62} L${w} ${h * 0.62} L${w * 0.82} ${h} L${w * 0.18} ${h} Z" fill="#050d16"/>`
  const vp = h * 0.62
  out += `<line x1="${w / 2}" y1="${vp}" x2="${w * 0.18}" y2="${h}" stroke="${GOLD[0]}33" stroke-width="1"/>
<line x1="${w / 2}" y1="${vp}" x2="${w * 0.82}" y2="${h}" stroke="${GOLD[0]}33" stroke-width="1"/>`
  const ws = opts.windowSide || 'center'
  if (ws === 'left' || ws === 'center') {
    out += `<rect x="${w * 0.08}" y="${h * 0.14}" width="${w * 0.3}" height="${h * 0.3}" fill="${accent}14" stroke="${accent}66" stroke-width="1.5"/>
<line x1="${w * 0.08}" y1="${h * 0.29}" x2="${w * 0.38}" y2="${h * 0.29}" stroke="${accent}66" stroke-width="1"/>
<line x1="${w * 0.23}" y1="${h * 0.14}" x2="${w * 0.23}" y2="${h * 0.44}" stroke="${accent}66" stroke-width="1"/>
<circle cx="${w * 0.2}" cy="${h * 0.22}" r="6" fill="${accent}" opacity="0.5"/>`
  }
  if (ws === 'right' || ws === 'center') {
    out += `<rect x="${w * 0.62}" y="${h * 0.14}" width="${w * 0.3}" height="${h * 0.3}" fill="${accent}14" stroke="${accent}66" stroke-width="1.5"/>
<line x1="${w * 0.62}" y1="${h * 0.29}" x2="${w * 0.92}" y2="${h * 0.29}" stroke="${accent}66" stroke-width="1"/>
<line x1="${w * 0.77}" y1="${h * 0.14}" x2="${w * 0.77}" y2="${h * 0.44}" stroke="${accent}66" stroke-width="1"/>`
  }
  if (opts.furniture !== false) {
    out += `<rect x="${w * 0.06}" y="${h * 0.52}" width="${w * 0.22}" height="${h * 0.1}" fill="#102a47" stroke="${accent}44" stroke-width="1"/>
<rect x="${w * 0.72}" y="${h * 0.5}" width="${w * 0.2}" height="${h * 0.12}" fill="#102a47" stroke="${accent}44" stroke-width="1"/>`
  }
  if (opts.lightStrip) {
    out += `<rect x="0" y="${h * 0.1}" width="${w}" height="3" fill="${accent}" opacity="0.8"/>
<rect x="0" y="${h * 0.1 + 3}" width="${w}" height="10" fill="${accent}" opacity="0.12" filter="url(#blur)"/>`
  }
  if (opts.ceiling) {
    out += `<rect x="${w * 0.4}" y="0" width="${w * 0.2}" height="${h * 0.16}" fill="${accent}18" stroke="${accent}55" stroke-width="1.5"/>
<rect x="${w * 0.4}" y="0" width="${w * 0.2}" height="4" fill="${accent}" opacity="0.7"/>`
  }
  if (opts.wardrobe) {
    out += `<rect x="${w * 0.72}" y="${h * 0.2}" width="${w * 0.22}" height="${h * 0.42}" fill="#0a1b2e" stroke="${accent}66" stroke-width="1.5"/>
<line x1="${w * 0.83}" y1="${h * 0.2}" x2="${w * 0.83}" y2="${h * 0.62}" stroke="${accent}44" stroke-width="1"/>
<rect x="${w * 0.73}" y="${h * 0.24}" width="${w * 0.09}" height="${h * 0.08}" fill="${accent}22"/>
<rect x="${w * 0.84}" y="${h * 0.24}" width="${w * 0.09}" height="${h * 0.08}" fill="${accent}22"/>`
  }
  if (opts.tv) {
    out += `<rect x="${w * 0.38}" y="${h * 0.28}" width="${w * 0.24}" height="${h * 0.15}" fill="#050d16" stroke="${accent}88" stroke-width="1.5"/>
<rect x="${w * 0.45}" y="${h * 0.43}" width="${w * 0.1}" height="${h * 0.07}" fill="#0a1b2e" stroke="${accent}44" stroke-width="1"/>
<rect x="${w * 0.42}" y="${h * 0.5}" width="${w * 0.16}" height="3" fill="${accent}" opacity="0.7"/>`
  }
  if (opts.wallPanel) {
    for (let i = 0; i < 6; i++) {
      out += `<rect x="${w * 0.06 + i * (w * 0.88 / 6)}" y="${h * 0.34}" width="${w * 0.88 / 6 - 6}" height="${h * 0.3}" fill="none" stroke="${accent}3d" stroke-width="1.5"/>`
    }
  }
  if (opts.island) {
    out += `<rect x="${w * 0.4}" y="${h * 0.62}" width="${w * 0.2}" height="${h * 0.14}" fill="#102a47" stroke="${accent}55" stroke-width="1.5"/>
<rect x="${w * 0.4}" y="${h * 0.62}" width="${w * 0.2}" height="3" fill="${accent}" opacity="0.6"/>`
  }
  return out
}

function landPlot(w, h) {
  let out = `<path d="M0 ${h} L${w} ${h} L${w} ${h * 0.42} L${w * 0.72} ${h * 0.2} L${w * 0.28} ${h * 0.28} L0 ${h * 0.5} Z" fill="#0a1b2e" stroke="${GOLD[0]}44" stroke-width="1.5"/>`
  for (let i = 1; i < 6; i++) {
    out += `<line x1="${0}" y1="${h * 0.5 + (i / 6) * h * 0.5}" x2="${w * (0.72 + 0.28 * (i / 6))}" y2="${h * 0.2 + (i / 6) * h * 0.8}" stroke="${GOLD[0]}2e" stroke-width="1"/>`
  }
  for (let j = 1; j < 8; j++) {
    out += `<line x1="${(w / 8) * j}" y1="${h * 0.5 + 0.5 * h * (1 - (w / 8) * j / w) * 0}" x2="${(w / 8) * j * 0.8}" y2="${h}" stroke="${GOLD[0]}2e" stroke-width="1"/>`
  }
  const plots = [
    [0.14, 0.36, 0.2, 0.16], [0.38, 0.4, 0.22, 0.2], [0.66, 0.32, 0.2, 0.14],
    [0.12, 0.58, 0.24, 0.2], [0.44, 0.66, 0.18, 0.18], [0.7, 0.56, 0.2, 0.2],
  ]
  for (const [px, py, pw, ph] of plots) {
    out += `<rect x="${w * px}" y="${h * py}" width="${w * pw}" height="${h * ph}" fill="none" stroke="${pick(GOLD)}${rnd(0.35, 0.7).toFixed(2)})" stroke-width="1.5"/>`
    if (rnd() < 0.6) out += `<rect x="${w * px}" y="${h * py}" width="${w * pw}" height="${h * ph}" fill="${pick(GOLD)}${rnd(0.03, 0.09).toFixed(2)})"/>`
  }
  out += `<circle cx="${w * 0.3}" cy="${h * 0.66}" r="3" fill="${GOLD[0]}" opacity="0.8"/>`
  out += `<circle cx="${w * 0.55}" cy="${h * 0.74}" r="2.4" fill="${GOLD[0]}" opacity="0.6"/>`
  return out
}

function villa(w, h) {
  let out = ''
  const gx = w * 0.42
  const gy = h * 0.52
  out += `<path d="M${gx - w * 0.26} ${gy} L${gx} ${gy - h * 0.34} L${gx + w * 0.26} ${gy} Z" fill="#0d2138" stroke="${GOLD[0]}66" stroke-width="1.5"/>`
  out += `<path d="M${gx - w * 0.26} ${gy} L${gx - w * 0.26} ${gy + h * 0.3} L${gx + w * 0.26} ${gy + h * 0.3} L${gx + w * 0.26} ${gy} Z" fill="#102a47" stroke="${GOLD[0]}66" stroke-width="1.5"/>`
  out += `<rect x="${gx - w * 0.12}" y="${gy - h * 0.14}" width="${w * 0.24}" height="${h * 0.16}" fill="${GOLD[0]}2e" stroke="${GOLD[0]}88" stroke-width="1.5"/>`
  out += `<rect x="${gx - w * 0.03}" y="${gy + h * 0.05}" width="${w * 0.06}" height="${h * 0.13}" fill="#0a1b2e" stroke="${GOLD[0]}55" stroke-width="1"/>`
  out += `<circle cx="${gx}" cy="${gy - h * 0.34}" r="2.2" fill="${GOLD[0]}" opacity="0.9"/>`
  out += `<line x1="${gx}" y1="${gy - h * 0.34}" x2="${gx}" y2="${gy - h * 0.44}" stroke="${GOLD[0]}" stroke-width="1.5"/>`
  out += `<rect x="${gx - w * 0.36}" y="${gy + h * 0.3}" width="${w * 0.72}" height="${h * 0.08}" fill="${GOLD[0]}14"/>`
  out += `<line x1="${gx - w * 0.36}" y1="${gy + h * 0.3}" x2="${gx + w * 0.36}" y2="${gy + h * 0.3}" stroke="${GOLD[0]}66" stroke-width="1"/>`
  if (rnd() < 0.7) {
    out += `<ellipse cx="${gx + w * 0.36}" cy="${gy + h * 0.46}" rx="${w * 0.12}" ry="${h * 0.05}" fill="#0c2036" stroke="${GOLD[0]}33" stroke-width="1"/>`
  }
  out += `<path d="M${gx - w * 0.44} ${gy + h * 0.38} Q${gx - w * 0.4} ${gy + h * 0.28} ${gx - w * 0.3} ${gy + h * 0.38} Z" fill="#0c2036" stroke="${GOLD[0]}44" stroke-width="1"/>`
  return out
}

function maintenanceScene(w, h, kind) {
  let out = ''
  if (kind === 'cleaning') {
    out += `<rect x="${w * 0.2}" y="${h * 0.1}" width="${w * 0.6}" height="${h * 0.6}" fill="#0d2138" stroke="${GOLD[0]}55" stroke-width="1.5"/>`
    for (let i = 1; i < 8; i++) {
      out += `<line x1="${w * 0.2}" y1="${h * 0.1 + (h * 0.6 / 8) * i}" x2="${w * 0.8}" y2="${h * 0.1 + (h * 0.6 / 8) * i}" stroke="${GOLD[0]}22" stroke-width="1"/>`
    }
    out += `<rect x="${w * 0.46}" y="${h * 0.68}" width="${w * 0.08}" height="${h * 0.22}" fill="#102a47" stroke="${GOLD[0]}66" stroke-width="1.5"/>`
    out += `<path d="M${w * 0.42} ${h * 0.7} L${w * 0.58} ${h * 0.7} L${w * 0.58} ${h * 0.66} L${w * 0.42} ${h * 0.66} Z" fill="${GOLD[0]}" opacity="0.8"/>`
  } else if (kind === 'plumbing') {
    out += `<circle cx="${w / 2}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.22}" fill="none" stroke="${GOLD[0]}77" stroke-width="3"/>
<path d="M${w / 2} ${h * 0.42} L${w / 2} ${h * 0.8}" stroke="${GOLD[0]}" stroke-width="3" fill="none"/>
<circle cx="${w / 2}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.05}" fill="${GOLD[0]}" opacity="0.7"/>
<path d="M${w / 2} ${h * 0.2} L${w * 0.34} ${h * 0.3} L${w * 0.34} ${h * 0.54} L${w / 2} ${h * 0.42} Z" fill="${GOLD[0]}22" stroke="${GOLD[0]}55" stroke-width="1.5"/>`
  } else if (kind === 'electrical') {
    out += `<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.2}" fill="none" stroke="${GOLD[0]}77" stroke-width="2.5"/>
<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.06}" fill="${GOLD[0]}" opacity="0.9"/>
<line x1="${w / 2}" y1="${h * 0.24}" x2="${w / 2}" y2="${h * 0.76}" stroke="${GOLD[0]}44" stroke-width="1" stroke-dasharray="4 5"/>
<line x1="${w * 0.24}" y1="${h / 2}" x2="${w * 0.76}" y2="${h / 2}" stroke="${GOLD[0]}44" stroke-width="1" stroke-dasharray="4 5"/>`
  } else if (kind === 'fabrication') {
    out += `<path d="M${w * 0.3} ${h * 0.18} L${w * 0.7} ${h * 0.18} L${w * 0.82} ${h * 0.82} L${w * 0.18} ${h * 0.82} Z" fill="none" stroke="${GOLD[0]}77" stroke-width="2.5"/>
<line x1="${w * 0.3}" y1="${h * 0.18}" x2="${w * 0.18}" y2="${h * 0.82}" stroke="${GOLD[0]}44" stroke-width="1.5"/>
<line x1="${w * 0.7}" y1="${h * 0.18}" x2="${w * 0.82}" y2="${h * 0.82}" stroke="${GOLD[0]}44" stroke-width="1.5"/>
<line x1="${w * 0.3}" y1="${h * 0.18}" x2="${w * 0.82}" y2="${h * 0.82}" stroke="${GOLD[0]}55" stroke-width="1.5"/>
<line x1="${w * 0.7}" y1="${h * 0.18}" x2="${w * 0.18}" y2="${h * 0.82}" stroke="${GOLD[0]}55" stroke-width="1.5"/>`
  } else if (kind === 'painting') {
    out += `<rect x="${w * 0.14}" y="${h * 0.12}" width="${w * 0.72}" height="${h * 0.58}" fill="${GOLD[0]}0d" stroke="${GOLD[0]}66" stroke-width="1.5"/>
<rect x="${w * 0.14}" y="${h * 0.12}" width="${w * 0.72}" height="${h * 0.58}" fill="url(#bg)"/>
<path d="M${w * 0.2} ${h * 0.28} L${w * 0.36} ${h * 0.44} L${w * 0.28} ${h * 0.52} L${w * 0.12} ${h * 0.36} Z" fill="${GOLD[0]}44"/>
<rect x="${w * 0.6}" y="${h * 0.2}" width="${w * 0.16}" height="${h * 0.5}" fill="#0d2138" stroke="${GOLD[0]}55" stroke-width="1.5"/>
<path d="M${w * 0.68} ${h * 0.2} L${w * 0.68} ${h * 0.12} L${w * 0.72} ${h * 0.14} L${w * 0.64} ${h * 0.14} Z" fill="${GOLD[0]}" opacity="0.8"/>`
  } else if (kind === 'tank') {
    out += `<rect x="${w * 0.3}" y="${h * 0.3}" width="${w * 0.4}" height="${h * 0.5}" fill="#0d2138" stroke="${GOLD[0]}77" stroke-width="2.5"/>
<rect x="${w * 0.3}" y="${h * 0.3}" width="${w * 0.4}" height="${h * 0.08}" fill="${GOLD[0]}44"/>
<line x1="${w * 0.46}" y1="${h * 0.38}" x2="${w * 0.46}" y2="${h * 0.76}" stroke="${GOLD[0]}44" stroke-width="1.5"/>
<line x1="${w * 0.54}" y1="${h * 0.38}" x2="${w * 0.54}" y2="${h * 0.76}" stroke="${GOLD[0]}44" stroke-width="1.5"/>
<path d="M${w * 0.38} ${h * 0.8} L${w * 0.62} ${h * 0.8} L${w * 0.58} ${h * 0.92} L${w * 0.42} ${h * 0.92} Z" fill="${GOLD[0]}22" stroke="${GOLD[0]}55" stroke-width="1.5"/>`
  } else if (kind === 'drain') {
    out += `<circle cx="${w / 2}" cy="${h * 0.4}" r="${Math.min(w, h) * 0.24}" fill="#0d2138" stroke="${GOLD[0]}66" stroke-width="2.5"/>
<circle cx="${w / 2}" cy="${h * 0.4}" r="${Math.min(w, h) * 0.18}" fill="none" stroke="${GOLD[0]}33" stroke-width="1.5"/>
<circle cx="${w / 2}" cy="${h * 0.4}" r="${Math.min(w, h) * 0.1}" fill="none" stroke="${GOLD[0]}55" stroke-width="1.5"/>
<path d="M${w * 0.42} ${h * 0.7} L${w * 0.58} ${h * 0.7} L${w * 0.54} ${h * 0.9} L${w * 0.46} ${h * 0.9} Z" fill="${GOLD[0]}22" stroke="${GOLD[0]}55" stroke-width="1.5"/>`
  } else if (kind === 'carpenter') {
    out += `<rect x="${w * 0.4}" y="${h * 0.26}" width="${w * 0.24}" height="${h * 0.34}" fill="#0d2138" stroke="${GOLD[0]}66" stroke-width="2"/>
<line x1="${w * 0.52}" y1="${h * 0.26}" x2="${w * 0.52}" y2="${h * 0.6}" stroke="${GOLD[0]}44" stroke-width="1.5"/>
<rect x="${w * 0.42}" y="${h * 0.3}" width="${w * 0.08}" height="${h * 0.1}" fill="${GOLD[0]}22"/>
<rect x="${w * 0.54}" y="${h * 0.3}" width="${w * 0.08}" height="${h * 0.1}" fill="${GOLD[0]}22"/>
<line x1="${w * 0.28}" y1="${h * 0.5}" x2="${w * 0.4}" y2="${h * 0.5}" stroke="${GOLD[0]}" stroke-width="2.5"/>
<line x1="${w * 0.28}" y1="${h * 0.5}" x2="${w * 0.26}" y2="${h * 0.42}" stroke="${GOLD[0]}" stroke-width="2.5"/>
<line x1="${w * 0.28}" y1="${h * 0.5}" x2="${w * 0.26}" y2="${h * 0.58}" stroke="${GOLD[0]}" stroke-width="2.5"/>`
  } else if (kind === 'amc') {
    for (let i = 0; i < 4; i++) {
      out += `<rect x="${w * 0.14 + i * w * 0.2}" y="${h * 0.3}" width="${w * 0.14}" height="${h * 0.4}" fill="${i % 2 ? '#0d2138' : '#102a47'}" stroke="${GOLD[0]}${(0.4 + i * 0.12).toFixed(2)})" stroke-width="1.5"/>`
    }
    out += `<path d="M${w * 0.14} ${h * 0.3} L${w * 0.86} ${h * 0.3} L${w * 0.8} ${h * 0.22} L${w * 0.2} ${h * 0.22} Z" fill="${GOLD[0]}14" stroke="${GOLD[0]}66" stroke-width="1.5"/>`
    out += `<rect x="${w * 0.44}" y="${h * 0.7}" width="${w * 0.12}" height="${h * 0.14}" fill="#0a1b2e" stroke="${GOLD[0]}55" stroke-width="1.5"/>`
  } else if (kind === 'aluminium') {
    for (let i = 0; i < 3; i++) {
      out += `<rect x="${w * 0.12 + i * w * 0.28}" y="${h * 0.24}" width="${w * 0.2}" height="${h * 0.5}" fill="${GOLD[0]}0a" stroke="${GOLD[0]}55" stroke-width="1.5"/>
<line x1="${w * 0.12 + i * w * 0.28}" y1="${h * 0.24}" x2="${w * 0.32 + i * w * 0.28}" y2="${h * 0.24}" stroke="${GOLD[0]}77" stroke-width="3"/>
<line x1="${w * 0.22 + i * w * 0.28}" y1="${h * 0.24}" x2="${w * 0.22 + i * w * 0.28}" y2="${h * 0.74}" stroke="${GOLD[0]}44" stroke-width="1.5"/>`
    }
  } else if (kind === 'ss') {
    out += `<path d="M${w * 0.24} ${h * 0.7} L${w * 0.76} ${h * 0.7} L${w * 0.7} ${h * 0.22} L${w * 0.3} ${h * 0.22} Z" fill="none" stroke="${GOLD[0]}88" stroke-width="2.5"/>
<line x1="${w * 0.5}" y1="${h * 0.22}" x2="${w * 0.5}" y2="${h * 0.7}" stroke="${GOLD[0]}44" stroke-width="1.5"/>
<circle cx="${w * 0.5}" cy="${h * 0.46}" r="${Math.min(w, h) * 0.05}" fill="${GOLD[0]}" opacity="0.6"/>`
  } else {
    out += skyline(w, h, h * 0.5, { tall: 1, winChance: 0.3 })
  }
  return out
}

function avatar(w, h, name) {
  const hue = rnd()
  const ring = pick(GOLD)
  const c1 = NAVY[Math.floor(hue * NAVY.length)]
  const c2 = NAVY[Math.min(NAVY.length - 1, Math.floor(hue * NAVY.length) + 1)]
  const initials = name.split(' ').map((s) => s[0]).slice(0, 2).join('')
  return `<rect width="${w}" height="${h}" fill="url(#bg)"/>
<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.38}" fill="${c2}" opacity="0.9"/>
<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.38}" fill="none" stroke="${ring}" stroke-width="2" opacity="0.7"/>
<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.3}" fill="none" stroke="${ring}" stroke-width="1" opacity="0.4" stroke-dasharray="3 4"/>
<text x="${w / 2}" y="${h / 2}" text-anchor="middle" dominant-baseline="central" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.26}" fill="${ring}" opacity="0.92">${initials}</text>
<rect x="${w * 0.12}" y="${h * 0.86}" width="${w * 0.76}" height="${h * 0.05}" fill="${ring}" opacity="0.35"/>
<text x="${w / 2}" y="${h * 0.92}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.09}" fill="#ffffff" opacity="0.75">ROYAL GROUP</text>`
}

const SCENES = {
  'hero-construction': (w, h) => skyline(w, h, h * 0.62, { tall: 1, winChance: 0.55 }) + villa(w, h) + sunGlow(w, h, w * 0.78, h * 0.3, Math.min(w, h) * 0.4),
  'hero-interiors': (w, h) => interior(w, h, { windowSide: 'center', lightStrip: true, ceiling: true, tv: true, island: true }),
  'hero-land': (w, h) => landPlot(w, h) + sunGlow(w, h, w * 0.7, h * 0.26, Math.min(w, h) * 0.34),
  'hero-maintenance': (w, h) => skyline(w, h, h * 0.55, { tall: 0.8 }) + maintenanceScene(w, h, 'amc'),
  'about-office': (w, h) => skyline(w, h, h * 0.4, { tall: 1, winChance: 0.6 }) + buildingCutaway(w, h) + sunGlow(w, h, w * 0.26, h * 0.3, Math.min(w, h) * 0.5),
  'about-blueprint': (w, h) => {
    let out = `<rect x="0" y="0" width="${w}" height="${h}" fill="#081625"/>`
    for (let x = 0; x < w; x += 60) out += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${GOLD[0]}18" stroke-width="1"/>`
    for (let y = 0; y < h; y += 60) out += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${GOLD[0]}18" stroke-width="1"/>`
    out += `<rect x="${w * 0.18}" y="${h * 0.2}" width="${w * 0.64}" height="${h * 0.6}" fill="none" stroke="${GOLD[0]}88" stroke-width="2"/>`
    out += `<line x1="${w * 0.18}" y1="${h * 0.2}" x2="${w * 0.5}" y2="${h * 0.5}" stroke="${GOLD[0]}66" stroke-width="1.5" stroke-dasharray="6 6"/>`
    out += `<line x1="${w * 0.5}" y1="${h * 0.5}" x2="${w * 0.82}" y2="${h * 0.2}" stroke="${GOLD[0]}66" stroke-width="1.5" stroke-dasharray="6 6"/>`
    out += `<rect x="${w * 0.62}" y="${h * 0.42}" width="${w * 0.14}" height="${h * 0.38}" fill="none" stroke="${GOLD[0]}99" stroke-width="2"/>`
    out += `<circle cx="${w * 0.28}" cy="${h * 0.72}" r="3" fill="${GOLD[0]}"/><circle cx="${w * 0.68}" cy="${h * 0.5}" r="3" fill="${GOLD[0]}"/>`
    out += `<text x="${w * 0.5}" y="${h * 0.14}" text-anchor="middle" font-family="Georgia, serif" font-size="${h * 0.05}" fill="${GOLD[0]}" opacity="0.8" letter-spacing="4">ROYAL GROUP</text>`
    return out
  },
  'construction-site': (w, h) => skyline(w, h, h * 0.68, { tall: 0.9, winChance: 0.4 }) + buildingCutaway(w, h, { floorH: h * 0.09 }),
  'construction-crane': (w, h) => skyline(w, h, h * 0.6, { tall: 1.1, winChance: 0.5 }) + sunGlow(w, h, w * 0.24, h * 0.34, Math.min(w, h) * 0.42),
  'construction-structure': (w, h) => {
    let out = `<rect width="${w}" height="${h}" fill="#081625"/>`
    for (let i = 0; i < 9; i++) {
      out += `<rect x="${w * 0.1 + i * w * 0.1}" y="${h * 0.06 + (i % 2) * h * 0.05}" width="${w * 0.08}" height="${h * 0.88}" fill="none" stroke="${GOLD[0]}${(0.25 + i * 0.05).toFixed(2)})" stroke-width="1.5"/>`
    }
    for (let j = 0; j < 6; j++) {
      out += `<line x1="${w * 0.1}" y1="${h * 0.14 + j * h * 0.12}" x2="${w * 0.9}" y2="${h * 0.14 + j * h * 0.12}" stroke="${GOLD[0]}2a" stroke-width="1.5"/>`
    }
    return out
  },
  'villa': (w, h) => skyline(w, h, h * 0.55, { tall: 0.5, winChance: 0.3 }) + villa(w, h) + sunGlow(w, h, w * 0.76, h * 0.28, Math.min(w, h) * 0.38),
  'apartment': (w, h) => skyline(w, h, h * 0.4, { tall: 1.2, winChance: 0.6 }) + buildingCutaway(w, h, { floorH: h * 0.1 }),
  'commercial': (w, h) => skyline(w, h, h * 0.35, { tall: 1.5, winChance: 0.65 }) + buildingCutaway(w, h, { floorH: h * 0.07 }) + sunGlow(w, h, w * 0.3, h * 0.3, Math.min(w, h) * 0.45),
  'land': (w, h) => landPlot(w, h) + sunGlow(w, h, w * 0.72, h * 0.24, Math.min(w, h) * 0.3),
  'land-aerial': (w, h) => {
    let out = `<rect width="${w}" height="${h}" fill="#081625"/>`
    for (let x = 0; x < w; x += w * 0.14) out += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${GOLD[0]}1f" stroke-width="1"/>`
    for (let y = 0; y < h; y += h * 0.14) out += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${GOLD[0]}1f" stroke-width="1"/>`
    for (let i = 0; i < 10; i++) {
      const px = rnd(0, w - w * 0.16), py = rnd(0, h - h * 0.14)
      out += `<rect x="${px}" y="${py}" width="${w * 0.16}" height="${h * 0.14}" fill="none" stroke="${pick(GOLD)}${(0.3 + rnd() * 0.4).toFixed(2)})" stroke-width="1.5"/>`
    }
    out += `<path d="M0 ${h * 0.5} L${w} ${h * 0.52}" stroke="#102a47" stroke-width="10"/>`
    out += `<path d="M0 ${h * 0.5} L${w} ${h * 0.52}" stroke="${GOLD[0]}" stroke-width="1.5" stroke-dasharray="10 8"/>`
    return out
  },
  'interior-kitchen': (w, h) => interior(w, h, { windowSide: 'left', lightStrip: true, island: true }),
  'interior-wardrobe': (w, h) => interior(w, h, { windowSide: 'right', wardrobe: true, lightStrip: true }),
  'interior-tv': (w, h) => interior(w, h, { tv: true, lightStrip: true }),
  'interior-ceiling': (w, h) => interior(w, h, { ceiling: true, lightStrip: true }),
  'interior-living': (w, h) => interior(w, h, { windowSide: 'center', tv: true }),
  'interior-bedroom': (w, h) => interior(w, h, { windowSide: 'left', lightStrip: true }),
  'interior-panel': (w, h) => interior(w, h, { wallPanel: true, lightStrip: true }),
  'interior-kitchen-2': (w, h) => interior(w, h, { windowSide: 'right', island: true, lightStrip: true }),
  'interior-wardrobe-2': (w, h) => interior(w, h, { wardrobe: true, ceiling: true }),
  'interior-living-2': (w, h) => interior(w, h, { windowSide: 'center', tv: true, wallPanel: true }),
  'maint-cleaning': (w, h) => maintenanceScene(w, h, 'cleaning'),
  'maint-plumbing': (w, h) => maintenanceScene(w, h, 'plumbing'),
  'maint-electrical': (w, h) => maintenanceScene(w, h, 'electrical'),
  'maint-fabrication': (w, h) => maintenanceScene(w, h, 'fabrication'),
  'maint-painting': (w, h) => maintenanceScene(w, h, 'painting'),
  'maint-tank': (w, h) => maintenanceScene(w, h, 'tank'),
  'maint-drain': (w, h) => maintenanceScene(w, h, 'drain'),
  'maint-carpenter': (w, h) => maintenanceScene(w, h, 'carpenter'),
  'maint-amc': (w, h) => maintenanceScene(w, h, 'amc'),
  'maint-aluminium': (w, h) => maintenanceScene(w, h, 'aluminium'),
  'maint-ss': (w, h) => maintenanceScene(w, h, 'ss'),
  'maint-building': (w, h) => maintenanceScene(w, h, 'building'),
  'project-tower': (w, h) => skyline(w, h, h * 0.32, { tall: 1.6, winChance: 0.7 }) + buildingCutaway(w, h, { floorH: h * 0.06 }) + sunGlow(w, h, w * 0.7, h * 0.28, Math.min(w, h) * 0.5),
  'project-villa': (w, h) => skyline(w, h, h * 0.5, { tall: 0.6 }) + villa(w, h) + sunGlow(w, h, w * 0.8, h * 0.3, Math.min(w, h) * 0.35),
  'project-museum': (w, h) => {
    let out = `<rect width="${w}" height="${h}" fill="#081625"/>`
    out += `<path d="M${w * 0.14} ${h * 0.42} L${w / 2} ${h * 0.16} L${w * 0.86} ${h * 0.42} L${w * 0.86} ${h * 0.78} L${w * 0.14} ${h * 0.78} Z" fill="#0d2138" stroke="${GOLD[0]}88" stroke-width="2"/>`
    out += `<line x1="${w / 2}" y1="${h * 0.16}" x2="${w / 2}" y2="${h * 0.78}" stroke="${GOLD[0]}44" stroke-width="1.5"/>`
    out += `<rect x="${w * 0.42}" y="${h * 0.42}" width="${w * 0.16}" height="${h * 0.14}" fill="none" stroke="${GOLD[0]}99" stroke-width="1.5"/>`
    out += `<rect x="${w * 0.14}" y="${h * 0.78}" width="${w * 0.72}" height="${h * 0.06}" fill="#102a47" stroke="${GOLD[0]}55" stroke-width="1.5"/>`
    out += `<circle cx="${w * 0.5}" cy="${h * 0.16}" r="2.5" fill="${GOLD[0]}" opacity="0.9"/>`
    for (let i = 0; i < 6; i++) {
      const x = w * 0.18 + i * w * 0.13
      out += `<line x1="${x}" y1="${h * 0.42}" x2="${x}" y2="${h * 0.78}" stroke="${GOLD[0]}33" stroke-width="1"/>`
    }
    return out
  },
  'project-commercial': (w, h) => skyline(w, h, h * 0.34, { tall: 1.4, winChance: 0.68 }) + buildingCutaway(w, h, { floorH: h * 0.08 }) + sunGlow(w, h, w * 0.28, h * 0.3, Math.min(w, h) * 0.42),
  'project-interior': (w, h) => interior(w, h, { windowSide: 'center', lightStrip: true, ceiling: true, tv: true, wardrobe: true }),
  'project-residence': (w, h) => skyline(w, h, h * 0.52, { tall: 0.7 }) + villa(w, h) + interior(w, h, {}) 
}

function sceneOf(scene, w, h) {
  const fn = SCENES[scene]
  if (!fn) return SCENES['construction-site'](w, h)
  return fn(w, h)
}

const DEFINITIONS = {
  construction: ['construction-site', 'construction-crane', 'construction-structure'],
  interior: ['interior-kitchen', 'interior-wardrobe', 'interior-tv', 'interior-ceiling', 'interior-living', 'interior-bedroom', 'interior-panel', 'interior-kitchen-2', 'interior-wardrobe-2', 'interior-living-2'],
  land: ['land', 'land-aerial'],
  villa: ['villa'],
  apartment: ['apartment'],
  commercial: ['commercial'],
  maintenance: ['maint-cleaning', 'maint-plumbing', 'maint-electrical', 'maint-fabrication', 'maint-painting', 'maint-tank', 'maint-drain', 'maint-carpenter', 'maint-amc', 'maint-aluminium', 'maint-ss', 'maint-building'],
  project: ['project-tower', 'project-villa', 'project-museum', 'project-commercial', 'project-interior', 'project-residence'],
  hero: ['hero-construction', 'hero-interiors', 'hero-land', 'hero-maintenance'],
  about: ['about-office', 'about-blueprint'],
}

function render(scene, w, h) {
  const top = pick(NAVY)
  const bottom = NAVY[Math.min(NAVY.length - 1, NAVY.indexOf(top) + 1)] || '#050d16'
  const body = sceneOf(scene, w, h)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>${gradient(w, h, top, bottom)}
<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${Math.min(w, h) * 0.012}"/></filter>
<filter id="soft"><feGaussianBlur stdDeviation="${Math.min(w, h) * 0.004}"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
${stars(w, h)}
${body}
${noise(w, h)}
${goldParticles(w, h)}
${vignette(w, h)}
</svg>`
}

const SPECS = [
  ['hero-construction.jpg', 1920, 1080], ['hero-interiors.jpg', 1920, 1080], ['hero-land.jpg', 1920, 1080], ['hero-maintenance.jpg', 1920, 1080],
  ['about-office.jpg', 1200, 1400], ['about-blueprint.jpg', 1200, 900],
  ['construction-site-1.jpg', 1600, 900], ['construction-site-2.jpg', 1600, 1000], ['construction-crane-1.jpg', 1600, 900], ['construction-structure-1.jpg', 1600, 1000], ['construction-villa-1.jpg', 1600, 900], ['construction-apartment-1.jpg', 1600, 1000], ['construction-commercial-1.jpg', 1600, 900],
  ['interior-kitchen-1.jpg', 1600, 1000], ['interior-kitchen-2.jpg', 1600, 900], ['interior-wardrobe-1.jpg', 1600, 1000], ['interior-wardrobe-2.jpg', 1600, 900], ['interior-tv-1.jpg', 1600, 900], ['interior-ceiling-1.jpg', 1600, 900], ['interior-ceiling-2.jpg', 1600, 1000], ['interior-living-1.jpg', 1600, 1000], ['interior-living-2.jpg', 1600, 900], ['interior-bedroom-1.jpg', 1600, 1000], ['interior-panel-1.jpg', 1600, 900],
  ['interior-before-1.jpg', 1600, 900], ['interior-after-1.jpg', 1600, 900], ['interior-before-2.jpg', 1600, 900], ['interior-after-2.jpg', 1600, 900], ['interior-before-3.jpg', 1600, 900], ['interior-after-3.jpg', 1600, 900],
  ['land-1.jpg', 1600, 900], ['land-2.jpg', 1600, 1000], ['land-aerial-1.jpg', 1600, 900], ['land-commercial-1.jpg', 1600, 900], ['land-invest-1.jpg', 1600, 1000],
  ['maintenance-cleaning.jpg', 1600, 900], ['maintenance-tank.jpg', 1600, 900], ['maintenance-sump.jpg', 1600, 900], ['maintenance-tile.jpg', 1600, 900], ['maintenance-office.jpg', 1600, 900], ['maintenance-house.jpg', 1600, 900], ['maintenance-drain.jpg', 1600, 900], ['maintenance-plumbing.jpg', 1600, 900], ['maintenance-electrical.jpg', 1600, 900], ['maintenance-fabrication.jpg', 1600, 900], ['maintenance-aluminium.jpg', 1600, 900], ['maintenance-pvc.jpg', 1600, 900], ['maintenance-ss.jpg', 1600, 900], ['maintenance-carpenter.jpg', 1600, 900], ['maintenance-painting.jpg', 1600, 900], ['maintenance-amc.jpg', 1600, 900], ['maintenance-building.jpg', 1600, 900],
  ['project-apex-tower.jpg', 1600, 1000], ['project-villa-serenite.jpg', 1600, 1000], ['project-grand-museum.jpg', 1600, 1000], ['project-skyline-office.jpg', 1600, 1000], ['project-golden-residence.jpg', 1600, 1000], ['project-royal-penthouse.jpg', 1600, 1000], ['project-before-1.jpg', 1600, 900], ['project-after-1.jpg', 1600, 900], ['project-before-2.jpg', 1600, 900], ['project-after-2.jpg', 1600, 900], ['project-before-3.jpg', 1600, 900], ['project-after-3.jpg', 1600, 900],
]

const AVATARS = [
  ['team-1.jpg', 'Raja Sekaran'], ['team-2.jpg', 'Priya Raman'], ['team-3.jpg', 'Karthik Subramani'], ['team-4.jpg', 'Meena Krishnan'], ['team-5.jpg', 'Arun Prakash'], ['team-6.jpg', 'Divya Chandran'],
]

mkdirSync(OUT, { recursive: true })

for (const [name, w, h] of SPECS) {
  const scene = name.replace(/-\d+\.jpg$/, '.jpg').replace('.jpg', '').replace(/^(before|after)/, 'interior')
  const isBefore = /before/.test(name)
  const isAfter = /after/.test(name)
  let svg
  if (isBefore) {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="${w}" height="${h}" fill="#1a1a1a"/>
<rect x="${w * 0.1}" y="${h * 0.1}" width="${w * 0.8}" height="${h * 0.8}" fill="#262626" stroke="#3a3a3a" stroke-width="2"/>
<line x1="${w * 0.1}" y1="${h * 0.1}" x2="${w * 0.9}" y2="${h * 0.9}" stroke="#3a3a3a" stroke-width="1"/>
<line x1="${w * 0.9}" y1="${h * 0.1}" x2="${w * 0.1}" y2="${h * 0.9}" stroke="#3a3a3a" stroke-width="1"/>
<rect x="${w * 0.42}" y="${h * 0.42}" width="${w * 0.16}" height="${h * 0.16}" fill="none" stroke="#4a4a4a" stroke-width="1.5"/>
<text x="${w / 2}" y="${h * 0.5}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.min(w, h) * 0.04}" fill="#6a6a6a" letter-spacing="6">BEFORE</text>
${noise(w, h)}
</svg>`
  } else if (isAfter) {
    const body = sceneOf('interior-living', w, h)
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>${gradient(w, h, NAVY[2], NAVY[1])}
<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${Math.min(w, h) * 0.012}"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
${body}
${goldParticles(w, h)}
<rect x="${w * 0.05}" y="${h * 0.05}" width="${w * 0.9}" height="${h * 0.9}" fill="none" stroke="${GOLD[0]}66" stroke-width="1.5"/>
<text x="${w * 0.5}" y="${h * 0.94}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.045}" fill="${GOLD[0]}" letter-spacing="8" opacity="0.9">AFTER</text>
</svg>`
  } else {
    svg = render(scene, w, h)
  }
  writeFileSync(join(OUT, name), svg.replace(/\n\s+/g, ''))
  seed += name.length
}

for (const [name, person] of AVATARS) {
  const w = 800, h = 1000
  const c1 = NAVY[Math.floor(rnd(0, NAVY.length))]
  const c2 = NAVY[Math.min(NAVY.length - 1, NAVY.indexOf(c1) + 1)] || '#050d16'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>${gradient(w, h, c1, c2)}
<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${Math.min(w, h) * 0.012}"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
${avatar(w, h, person)}
${goldParticles(w, h)}
${vignette(w, h)}
</svg>`
  writeFileSync(join(OUT, name), svg.replace(/\n\s+/g, ''))
  seed += name.length
}

console.log(`Generated ${SPECS.length + AVATARS.length} images in public/images`)
