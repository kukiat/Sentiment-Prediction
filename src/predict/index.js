const  fs = require('fs')
var string = "x";
const { readText, readRate, readWord } = require('../utils/file')
const { getRatePlus, getRateMinus, getRating } = require('../utils/rate')

var myComment = string.toLowerCase().split(' ')
var testtext
var comment=[];

fs.readFile('../data/testtext.txt','utf8',function(err,data){
  if(err)return console.log(err);
  testtext = data.replace(/]-/g,']-').split('-')
  testtext = JSON.parse(testtext)
});

fs.readFile('../data/testrate.txt','utf8',function(err,data){
  if(err)return console.log(err);
  testrate = data.split(',');
});

var cutalldata;
fs.readFile('../data/weightWords.txt','utf8',function(err,data){
  if(err)return console.log(err);
  cutalldata = data.split(',');
  comment.push(myComment);
  console.log(comment);
  a()
});
var resultrateplus;

function a(){
  fs.readFile('../data/weightPlus.txt','utf8',function(err,data){
    if(err)return console.log(err);
    resultrateplus = data.split(',');
    for(i in resultrateplus){
      resultrateplus[i]=parseFloat(resultrateplus[i])
    }
    b()
  });
}

var resultrateminus;
function b(){
  fs.readFile('../data/weightMinus.txt', 'utf8', function(err,data){
    if(err)return console.log(err);
    resultrateminus = data.split(',');
    for(i in resultrateminus){
      resultrateminus[i]=parseFloat(resultrateminus[i])
    }
    c();
  });
}
var rate;
function c(){
  fs.readFile('../data/weightrating.txt', 'utf8', function(err,data){
    if(err)return console.log(err);
    rate = data.split(',');
    for(i in rate){
      rate[i]=parseInt(rate[i])
    }
    doit()
  });
}
function doit(){
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
  console.log('output', output)
}
