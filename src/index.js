const app = require('./app')

const PORT = process.env.PORT || 3002

app.listen(() => {
  console.log(`server start at port ${PORT}`)
})


