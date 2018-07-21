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


const getRatePlus = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../data/weightPlus.txt'), 'utf8', (err, data) => {
      if(err) reject(err)
      let resultrateplus = data.split(',');
      for(i in resultrateplus){
        resultrateplus[i]=parseFloat(resultrateplus[i])
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
      }
      console.log('fuck')
      let rate = data.split(',');
      for(i in rate){
        rate[i] = parseInt(rate[i])
      }
      resolve(rate)
    })
  })
}

const evaluate = async (comment, cutalldata, testrate) => {
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
  var resplus = 0
  var resminus = 0
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
    if(resplus>resminus){
      output[i][1] = 1
    }else {
      output[i][1] = 0
    }
  }
  var guess=[];
  for(i in output){
    guess.push(output[i][1])
  }
  var y = []
  for(i in guess){
    if(testrate[i]>3)
      y.push(1)
    else y.push(0)
  }
  //guess คือค่าของเราที่ทำนาย
  //y คือค่าจริงๆของdataนั้น
  var score=0,sum=0
  for(i in y){
    if(guess[i] == y[i]){
      score++;
      // console.log(guess[i]+' : '+y[i]);
    }
    else{
      // console.log(guess[i]+' : '+y[i]+' false');
    }
    sum++
  }
  result = score/sum;
  console.log('\n-------------------------------------------------------------------\n');
  console.log('Predict result');
  console.log('Total : '+y.length);
  console.log('True : '+score+' False : '+(y.length-score));
  console.log('Error : '+(1-result));
  console.log('Accuracy : '+(100*result)+' %');
  console.log('\n-------------------------------------------------------------------');
  return Promise.resolve()
}

const testData = async () => {
  try {
    const comment = await readText()
    const testrate = await readRate()
    const cutalldata = await readWord()
    await evaluate(comment, cutalldata, testrate)
  }catch(err) {
    console.log(err)
  }
}

testData()