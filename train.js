var jsonfile = require('jsonfile')

// var file = 'newdataja2.json'
var file = 'bigdata.json'
var xx= []
var x=[]  //input text
var y=[]  //ratingที่แบ่งแล้ว
var alldata=[]  //เอาคำทุกคำมาต่อกัน
jsonfile.readFile(file, function(err, data){
  //*****alldataที่ยังไม่ตัดคำซ้ำ************
  leng=10000
  for(i = 0; i < leng; i++){
    for(j = 0; j < data[i].text.length; j++){
      alldata.push(data[i].text[j])
    }
  }
  console.log('data nocut : '+alldata.length)
  //******alldataที่ยังตัดคำซ้ำแล้ว**********
  var cutalldata = alldata.reduce(function(a,b){
    if(a.indexOf(b) < 0 )
      a.push(b);
    return a;
  },[]);
  console.log('data cut : '+cutalldata.length)
  // for(i=0 ;i<cutalldata.length ;i++){
  //   console.log(i+': '+cutalldata[i])
  // }
  //***********คำนวณแปลงtextเปนbinary*************
  for(i = 0; i < leng; i++){
    x.push([])
    var table=[]
    for(k = 0; k < cutalldata.length; k++){
      table.push([])
      table[k][0] = cutalldata[k]
      table[k][1] = 0
    }
    for(j = 0; j < data[i].text.length; j++){
      for(l = 0; l < cutalldata.length; l++){
        if(data[i].text[j]==table[l][0]){
          table[l][1]++
        }
      }
    }
    for(m = 0; m < cutalldata.length; m++){
      x[i].push(table[m][1])
    }
  }
  //*******check rating 1-5 ว่ามีเท่าไร*************
  var check1=0;
  var check2=0;
  var check3=0;
  var check4=0;
  var check5=0;
  for(i=0; i<leng;i++){
    if(data[i].rating ==1){
      check1++
    }else if(data[i].rating ==2){
      check2++
    }else if(data[i].rating ==3){
      check3++
    }else if(data[i].rating ==4){
      check4++
    }else if(data[i].rating ==5){
      check5++
    }
  }
  console.log(check1+' '+check2+' '+check3+' '+check4+' '+check5)
  //*****chang rating to good or bad*****
  for(i=0; i<leng;i++){
    y.push([]);
    if(data[i].rating >3){
      y[i][0] = 1;
    }else{
      y[i][0] = 0;
    }
  }
  var rate =[]
  for(i in y){
    rate.push(y[i][0])
  }

  //**********print x and y ************
  // for(i=0; i<leng;i++){
  //   console.log('x :'+x[i])
  //   console.log('y :'+y[i])
  //   console.log('______')
  // }
  //***********bay algo*********
  var numberpplus=0
  var numberpminus=0
  for(i=0;i<y.length;i++){
    if(y[i]==1){
      numberpplus++
    }else{
      numberpminus++
    }
  }
  var pplus = numberpplus/(numberpplus+numberpminus)
  var pminus = numberpminus/(numberpplus+numberpminus)
  console.log('p+ = '+pplus)
  console.log('p- = '+pminus)
  var vocabulary = cutalldata.length
  var nofplus=0
  var nofminus=0

  for(i=0;i<x.length;i++){
    if(y[i][0] == 1){ //ดี
      for(j=0; j<cutalldata.length; j++){
        if(x[i][j]!=0){
          nofplus+=x[i][j]
        }
      }
    }else{
      for(k=0; k<cutalldata.length; k++){
        if(x[i][k]!=0){
          nofminus+=x[i][k]
        }
      }
    }
  }
  console.log('n+ = '+nofplus)
  console.log('n- = '+nofminus)
  var resultrateplus=[]
  var resultrateminus=[]
  for(i=0;i<cutalldata.length;i++){
    var np=0
    var nm=0
    resultrateplus.push([])
    resultrateminus.push([])
    for(j=0;j<x.length;j++){
      if(y[j] == 1){  //ดี
        np+=x[j][i]
      }else{
        nm+=x[j][i]
      }
    }
    var resu1 = (np+1)/(cutalldata.length+nofplus)
    resultrateplus[i][0] = cutalldata[i]
    resultrateplus[i][1] = resu1
    var resu2 = (nm+1)/(cutalldata.length+nofminus)
    resultrateminus[i][0] = cutalldata[i]
    resultrateminus[i][1] = resu2
  }
  //*******print weight of word********
  var weightPlus = [],weightMinus=[],weightWords=[]
  for(i=0;i<cutalldata.length;i++){
    console.log('+ : '+resultrateplus[i])
    console.log('- : '+resultrateminus[i])
    console.log("--------------------------------------------------------------------------------")
    weightPlus.push(resultrateplus[i][1])
    weightMinus.push(resultrateminus[i][1])
    weightWords.push(resultrateplus[i][0])
   }
   var fs = require('fs');
    fs.writeFile("weightPlus.txt",weightPlus, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    fs.writeFile("weightMinus.txt",weightMinus, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    fs.writeFile("weightWords.txt",weightWords, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    fs.writeFile("weightrating.txt",rate, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
})
