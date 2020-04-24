var request=require('request');
	express=require('express');
	app=express();
	twilio=require("twilio")
	_=require("underscore");
	CronJob=require("cron").CronJob;
var confirmed = 0;
var deaths=0;
	// const Nexmo = require('nexmo')

	// const Nexmo = require('nexmo');

// const nexmo = new Nexmo({
//   apiKey: '365e0162',
//   apiSecret: 'LsxZDccdDX5XzlwN',
// });
var client = new twilio('ACae4c56521f8a0ed752de25d4d15a3731', '2991bc1cdce238cb8fbbd0e4eb3d4324');


//var a;
var job=new CronJob('* * * * * *',function(){
	var options = {
			method: 'GET',
			url: 'https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaDistrictWiseDataForState',
			qs: {statecode: 'MH'},
			headers: {
				'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com',
				'x-rapidapi-key': '1c138af3edmsh5f4bf9a1aad505cp1a750ejsn07d6bdb74696'
			}
	};
request(options, function (error, response, body) {
	if (error) throw new Error(error);
	var parsedData=JSON.parse(body);
	//console.log(parsedData.data[1]);
	parsedData.data.filter(function(city){
		 if(city.name=="Mumbai"){
		 	confirmed=city.confirmed;
		 	deaths=city.deceased;
		 };
		});
		console.log(confirmed);
	});
});
//});
console.log("after instansiation");
job.start();



	//a=(parsedData.data[1].active).toString()
	//console.log(typeof a)
	//res.send(parsedData);
	// client.messages.create({
	//   to: '+918630757295',
	//   from: '+17759904978',
	//   body: "cases in  aligarh are " //selectedCity.data[0].active
	// }).then(message => console.log(message.status));
	// 	console.log("done")


app.get("/",function(req,res){
	res.send("hello beta");
})

app.listen(3000,function(req,res){
	console.log("server started");
})