// Arregla una imagen PNG exportada con el negro convertido en transparencia, como las versiones
// @2x de public/images/features/: las letras salen huecas y la franja negra de una bandera,
// vacía. Lo que queda encerrado dentro de una tarjeta o un botón vuelve a ponerse sobre negro;
// el fondo de fuera sigue transparente. Las versiones @1x están bien y no hace falta pasarlas.
//
// Uso: node lib/blog/scripts/restaurar-negro.mts <entrada.png> <salida.png>

import fs from "node:fs"
import zlib from "node:zlib"

const [input, output] = process.argv.slice(2)
if (!input || !output) {
  console.error("Uso: node lib/blog/scripts/restaurar-negro.mts <entrada.png> <salida.png>")
  process.exit(2)
}

// Read: only 8-bit RGBA without interlacing, which is what these exports are.
const file = fs.readFileSync(input)
let width = 0
let height = 0
const idat: Buffer[] = []
for (let pos = 8; pos < file.length; ) {
  const length = file.readUInt32BE(pos)
  const type = file.toString("latin1", pos + 4, pos + 8)
  const body = file.subarray(pos + 8, pos + 8 + length)
  if (type === "IHDR") {
    width = body.readUInt32BE(0)
    height = body.readUInt32BE(4)
    if (body[8] !== 8 || body[9] !== 6 || body[12] !== 0) {
      console.error(`${input}: solo PNG RGBA de 8 bits sin entrelazar`)
      process.exit(1)
    }
  }
  if (type === "IDAT") idat.push(body)
  pos += 12 + length
}
const raw = zlib.inflateSync(Buffer.concat(idat))
const stride = width * 4
const pixels = Buffer.alloc(height * stride)
for (let y = 0; y < height; y++) {
  const filter = raw[y * (stride + 1)]
  for (let x = 0; x < stride; x++) {
    const value = raw[y * (stride + 1) + 1 + x]
    const a = x >= 4 ? pixels[y * stride + x - 4] : 0
    const b = y > 0 ? pixels[(y - 1) * stride + x] : 0
    const c = x >= 4 && y > 0 ? pixels[(y - 1) * stride + x - 4] : 0
    const p = a + b - c
    const paeth = Math.abs(p - a) <= Math.abs(p - b) && Math.abs(p - a) <= Math.abs(p - c) ? a : Math.abs(p - b) <= Math.abs(p - c) ? b : c
    const predictor = [0, a, b, (a + b) >> 1, paeth][filter]
    pixels[y * stride + x] = (value + predictor) & 255
  }
}

const alpha = (x: number, y: number) => pixels[y * stride + x * 4 + 3]

// A pixel on the left or right edge with opaque pixels above and below it is a letter cut by the
// edge, not background: it does not seed the outside.
const insideCutChip = (x: number, y: number) => {
  let above = false
  let below = false
  for (let d = 1; d <= 40; d++) {
    if (y - d >= 0 && alpha(x, y - d) === 255) above = true
    if (y + d < height && alpha(x, y + d) === 255) below = true
  }
  return above && below
}

// Everything not opaque that the outside reaches is background.
const outside = new Uint8Array(width * height)
const queue: number[] = []
const seed = (x: number, y: number) => {
  if (alpha(x, y) < 255 && !outside[y * width + x]) {
    outside[y * width + x] = 1
    queue.push(y * width + x)
  }
}
for (let x = 0; x < width; x++) {
  seed(x, 0)
  seed(x, height - 1)
}
for (let y = 0; y < height; y++) {
  for (const x of [0, width - 1]) if (!insideCutChip(x, y)) seed(x, y)
}
while (queue.length) {
  const index = queue.pop()!
  const x = index % width
  const y = (index - x) / width
  for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) seed(nx, ny)
  }
}

// What stays enclosed goes back over black.
let restored = 0
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = y * stride + x * 4
    if (pixels[i + 3] < 255 && !outside[y * width + x]) {
      for (let c = 0; c < 3; c++) pixels[i + c] = Math.floor((pixels[i + c] * pixels[i + 3]) / 255)
      pixels[i + 3] = 255
      restored++
    }
  }
}

// Write, with the "sub" filter on every row.
const filtered = Buffer.alloc(height * (stride + 1))
for (let y = 0; y < height; y++) {
  filtered[y * (stride + 1)] = 1
  for (let x = 0; x < stride; x++) {
    const left = x >= 4 ? pixels[y * stride + x - 4] : 0
    filtered[y * (stride + 1) + 1 + x] = (pixels[y * stride + x] - left) & 255
  }
}
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc32 = (buffer: Buffer) => {
  let c = 0xffffffff
  for (const byte of buffer) c = crcTable[(c ^ byte) & 255] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
const chunk = (type: string, body: Buffer) => {
  const head = Buffer.alloc(8)
  head.writeUInt32BE(body.length, 0)
  head.write(type, 4, "latin1")
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), body])), 0)
  return Buffer.concat([head, body, crc])
}
const header = Buffer.alloc(13)
header.writeUInt32BE(width, 0)
header.writeUInt32BE(height, 4)
header[8] = 8
header[9] = 6
fs.writeFileSync(
  output,
  Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(filtered, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]),
)
console.log(`${output}: ${restored} píxeles recuperados dentro de tarjetas y botones`)
