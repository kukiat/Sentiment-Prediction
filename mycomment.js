var fs = require('fs')
//testtttttt data**********************
var string = "I am Idiot";


var myComment = string.toLowerCase().split(' ')
console.log(myComment);
var testtext,testrate;
var comment=[];
fs.readFile('testtext.txt','utf8',function(err,data){
  if(err)return console.log(err);
  testtext = data.replace(/]-/g,']-').split('-')
  testtext = JSON.parse(testtext)
});
fs.readFile('testrate.txt','utf8',function(err,data){
  if(err)return console.log(err);
  testrate = data.split(',');
});


var cutalldata;
fs.readFile('weightWords.txt','utf8',function(err,data){
  if(err)return console.log(err);
  cutalldata = data.split(',');
  comment.push(myComment);
console.log(comment);
  a()
});
var resultrateplus;
function a(){
  fs.readFile('weightPlus.txt','utf8',function(err,data){
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
  fs.readFile('weightMinus.txt','utf8',function(err,data){
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
  fs.readFile('weightrating.txt','utf8',function(err,data){
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
    if(resplus>resminus){
      output[i][1] = 1
    }else {
      output[i][1] = 0
    }
  }
  console.log(output)

  // for(i = 0; i < 1; i++){
  //   console.log('gg '+output[i])
  //   console.log('____')
  // }
  // for(i = 0; i < 2000; i++){
  //   if(output[i][1] == 0){
  //     console.log('bad '+output[i])
  //     console.log('____')
  //   }
  // }
}
