var request=require('request');
//var unirest = require("unirest");
	express=require('express');
	app=express();
	twilio=require("twilio")
var a;
//var req = unirest("GET", "https://covid19india.p.rapidapi.com/getStateData/UP/aligarh");
//var req = unirest("GET","https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewise");
var client = new twilio('AC5e5184b4ebe1c1400c24dd7bac4b9d74', '69822ae449c3bc187964fd8db78675d2');

var options = {
  method: 'GET',
  url: 'https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaDistrictWiseDataForState',
  qs: {statecode: 'UP'},
  headers: {
    'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com',
    'x-rapidapi-key': '1c138af3edmsh5f4bf9a1aad505cp1a750ejsn07d6bdb74696'
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
	var parsedData=JSON.parse(body);
	console.log(parsedData.data[1].active);
	a=(parsedData.data[1].active).toString()
	console.log(typeof a)
	//res.send(parsedData);
});




//app=express();


client.messages.create({
  to: '+918630757295',
  from: '+12029372063',
  body: "cases in  aligarh are" +  a
}).then(message => console.log(message.status));
	console.log("done")


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// 	//res.send(body);
// });

app.get("/",function(req,res){
	res.send("hello beta");
})

app.listen(3000,function(req,res){
	console.log("server started");
})