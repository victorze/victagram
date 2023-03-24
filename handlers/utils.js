const path = require('path')
const fs = require('fs/promises')

const saveImage = async (data, fileName) => {
  const imagesDirectory = path.join(__dirname, '..', 'public', 'images')
  const pathImage = `${imagesDirectory}/${fileName}`
  await fs.writeFile(pathImage, data)
  return `/images/${fileName}`
}

module.exports = {
  saveImage
}
