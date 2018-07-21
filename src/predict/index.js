const { mergeWord } = require('../utils/file')
const { getRatePlus, getRateMinus, getRating } = require('../utils/rate')

const predict = async (input) => {
  try {
    const myComment = input.toLowerCase().split(' ')
    const { cutalldata, comment } = await mergeWord(myComment)
    const resultrateplus = await getRatePlus()
    const resultrateminus = await getRateMinus()
    const rate = await getRating()

    var numberpplus = 0,numberpminus=0;
    for(i in rate){
      if(rate[i]==1)
        numberpplus++
      else if(rate[i]==0)
      numberpminus++
    }
    var pplus = numberpplus/(numberpplus+numberpminus)
    var pminus = numberpminus/(numberpplus+numberpminus)
    var xx = []
    var numm=0;
    for(i = 0; i < comment.length; i++){
      xx.push([])
      var table=[]
      for(k = 0; k < cutalldata.length; k++){
        table.push([])
        table[k][0] = cutalldata[k]
        table[k][1] = 0
      }
      for(j = 0; j < comment[i].length; j++){
        for(l = 0; l < cutalldata.length; l++){
          if(comment[i][j]==table[l][0]){
            table[l][1]++
          }
        }
      }

      for(m = 0; m < cutalldata.length; m++){
        xx[numm].push(table[m][1])
      }
      numm++
    }
    //test learning******************

    var resplus =0
    var resminus =0
    var output = []
    for(i = 0; i < xx.length; i++){
      output.push([''])
      for(j = 0; j < cutalldata.length; j++){
        if(xx[i][j] != 0){
          output[i][0]= output[i][0] + cutalldata[j]
          output[i][0]= output[i][0] + '-'
          resplus = xx[i][j]*resultrateplus[j]
          resminus = xx[i][j]*resultrateminus[j]
        }
      }
      resplus*= pplus
      resminus*= pminus
      if(resplus>resminus) {
        output[i][1] = 1 
      }else {
        output[i][1] = 0
      }
    }
    console.log(output[0][1])
    return output[0][1] ? 'good' : 'bad'
  }catch(err) {
    throw new Error('prediction error')
  }
}

module.exports = {
  predict
}
