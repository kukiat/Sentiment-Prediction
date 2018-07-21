const express = require('express')
const { predict } = require('./predict')
const router = express.Router()

router.post('/predict', async (req, res, next) => {
  try {
    console.log('eiei')
    const comment = req.body.comment
    const result = await predict(comment)
    res.status(200).send({
      result
    })
  }catch(err) {
    res.status(err.status || 500).send(err.message || err)
  }
})

router.get('/test', (req, res, next) => {
  res.send('ok')
})

module.exports = router