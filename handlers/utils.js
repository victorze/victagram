import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log('__dirname', __dirname)

export const saveImage = async (data, fileName) => {
  const imagesDirectory = path.join(__dirname, '..', 'public', 'images')
  const pathImage = `${imagesDirectory}/${fileName}`
  await fs.writeFile(pathImage, data)
  console.log(`/images/${fileName}`)
  return `/images/${fileName}`
}
