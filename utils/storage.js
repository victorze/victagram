import path from 'path'
import fs from 'fs/promises'
import { env } from '../config/index.js'

export const saveImage = async (data, fileName) => {
  const imagesDirectory = path.join(env.BASE_DIR, 'public', 'images')
  const pathImage = `${imagesDirectory}/${fileName}`
  await fs.writeFile(pathImage, data)
  console.log(`/images/${fileName}`)
  return `/images/${fileName}`
}
