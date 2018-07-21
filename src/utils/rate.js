const fs = require('fs')
const path = require('path')

const getRatePlus = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../data/weightPlus.txt'), 'utf8', (err, data) => {
      if(err) reject(err)
      let resultrateplus = data.split(',');
      for(i in resultrateplus){
        resultrateplus[i] = parseFloat(resultrateplus[i])
      }
      resolve(resultrateplus)
    })
  })
}

const getRateMinus = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../data/weightMinus.txt'), 'utf8', (err, data) => {
      if(err) reject(err)
      let resultrateminus = data.split(',');
      for(i in resultrateminus){
        resultrateminus[i] = parseFloat(resultrateminus[i])
      }
      resolve(resultrateminus)
    })
  })
}

const getRating = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../data/weightrating.txt'), 'utf8', function(err,data){
      if(err) {
        reject(err)
        return
      }
      let rate = data.split(',');
      for(i in rate){
        rate[i] = parseInt(rate[i])
      }
      resolve(rate)
    })
  })
}

module.exports = {
  getRatePlus,
  getRateMinus,
  getRating,
}