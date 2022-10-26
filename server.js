const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended : true}))
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){
  const userCity=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?appid=d676811737b10e49c22b4c370200b049&q="+userCity+"&units=metric";
  https.get(url,function(res1){

    res1.on("data",function(data){
      const json=JSON.parse(data);
      const temp=json.main.temp;
      const city=json.name;
      res.write("<h1>Weather in "+city+" is : " + temp + " Degree Celsius</h1>")
      res.send();
    })
  })

})

app.listen(300,function(req,res){
  console.log("Server Started");
})
