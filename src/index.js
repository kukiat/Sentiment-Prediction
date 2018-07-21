const path = require('path')
const fs = require('fs')
console.log(path.resolve(__dirname, ""))

fs.readFile(path.resolve(__dirname, './test.txt'), 'utf8', (err, data) => {
  console.log(data)
})