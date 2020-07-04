const mammoth = require('mammoth')
const path = require('path')
const fs = require('fs')
const md5 = require('md5')

const options = {
  convertImage: mammoth.images.imgElement((image) => {
    return image.read().then((buffer) => {
      const suffix = image.contentType.split('/').pop()
      const fileName = `./image/${md5(buffer)}.${suffix}`
      fs.writeFileSync(path.resolve(__dirname, 'html', fileName), buffer, 'binary')
      console.log('image save success.', fileName)
      return {
        src: fileName,
      }
    })
  })
}

async function word2html () {
  mammoth.convertToHtml({
    path: path.resolve(__dirname, './word/mp1.docx')
  }, options).then((res) => {
    fs.writeFile(path.resolve(__dirname, './html/mp1.html'), res.value, 'utf-8', (err) => {
      if (err) {
        throw err
      }
      console.log('done')
    })
  }).done()
}

word2html()

module.exports = word2html

// mammoth.convertToMarkdown({
//   path: path.resolve(__dirname, './word/1.docx')
// }, options).then((res) => {
//   console.log(res)
//   fs.writeFile(path.resolve(__dirname, './html/1.md'), res.value, 'utf-8', (err) => {
//     if (err) {
//       throw err
//     }
//     console.log('done md')
//   })
// }).done()


// mammoth.extractRawText({
//   path: path.resolve(__dirname, './word/1.docx')
// }).then((res) => {
//   console.log(res)
// })