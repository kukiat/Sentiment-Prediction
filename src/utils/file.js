const fs = require('fs')
const path = require('path')

const readText = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../data/testtext.txt'), 'utf8', (err,data) => {
      if(err) {
        reject(err)
        return
      }
      let testtext = data.replace(/]-/g,']-').split('-')
      resolve(JSON.parse(testtext))
    })
  })
}

const readRate = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../data/testrate.txt'), 'utf8', (err,data) => {
      if(err) {
        reject(err)
        return
      }
      testrate = data.split(',');
      resolve(testrate)
    })
  })
}

const readWord = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../data/weightWords.txt'), 'utf8', (err, data) => {
      if(err) reject(err)
      resolve(data.split(','))
    })
  })
}

const mergeWord = (myComment) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../data/weightWords.txt'), 'utf8', (err,data) => {
      if(err)
        reject(err);
      let comment = []
      let cutalldata = data.split(',');
      comment.push(myComment);
      resolve({
        cutalldata, comment
      })
    })
  })
}

module.exports = {
  readText,
  readRate,
  readWord,
  mergeWord
}