var request=require('request');
	express=require('express');
	app=express();
	twilio=require("twilio")
	_=require("underscore");
	CronJob=require("cron").CronJob;
	mongoose=require("mongoose");
	var stats = {};
	//var confirmedcases,deaths,active,newcases,recovered;
	// const Nexmo = require('nexmo')

	// const Nexmo = require('nexmo');

// const nexmo = new Nexmo({
//   apiKey: '365e0162',
//   apiSecret: 'LsxZDccdDX5XzlwN',x
// });

//var request = require('request');
// var options = {
//   method: 'POST',
//   url: 'https://http-api.d7networks.com/send?username=zqjs1695&password=CQbW8UhQ&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=SMSinfo&content=This is the sample content sent to test &to=+918630757295',
//   headers: {
//   },
//   formData: {

//   }
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

mongoose.connect('mongodb://localhost:27017/covid_app' || 'mongodb+srv://Amulya:Amulya29@@cluster0-esrca.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to mongoose server");
}).catch(err => {
	console.log("ERROR", err.message);
});
//,{useNewUrlParser:true,useUnifiedTopology:true})
var covidSchema=new mongoose.Schema({
	name:String,
	confirmed:Number,
	// dth:Number,
	// actv:Number,
	// new:Number,
	// recvr:Number
});
var Covid=mongoose.model("Covid",covidSchema);

// 

var client = new twilio('AC81bad57961d2f256bae9d7d47a17975a', 'eb17dc86afbc9181ff3e3b819372779e');

//bs deploy ke lye hai baad me delete krna hai
Covid.create({
		 	name:"Aligarh",
			confirmed:11
		  },function(err,response){
		 	if(err){
		 		console.log(err)
			 	 }
			 	 else{
			 	 	console.log("successfully created")
			 	 }
			 });

//var a;
var job=new CronJob(' * * * * *',function(){
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
	else{
		var parsedData=JSON.parse(body);
		parsedData.data.filter(function(city){
		 	if(city.name=="Aligarh"){
		 	//console.log(city.confirmed + " " + typeof city.confirmed);
		 	Covid.findOne({name: "Aligarh"},function(err,doc){
					// console.log(typeof doc.toString());
					if(city.confirmed==doc.confirmed.toString())
					console.log("No new case "/*+city.confirmed+doc.confirmed.toString()*/);
					else{
					Covid.updateOne({name:"Aligarh"},city,function(err,updated){
						console.log("successfully updated");
						client.messages.create({
						  to: '+918630757295',
						  from: '+18634501351',
						  body: "COVID 19 ALERT!!!\n" +city.newconfirmed +"New cases in  Aligarh\n Confirmed: "+city.confirmed +"\nDeaths: "+city.deceased //selectedCity.data[0].active
						}).then(message => console.log(message.status));
				});
		};
	});	
}
});
};
});
});
console.log("after instansiation");
job.start();

app.listen(process.env.PORT || 3000,function(req,res){
	console.log("server started");
})

//console.log(parsedData.data[1]);
		// 
				
		// 	}
				// stats ={
				// 	name:city.name,
				// 	cnf:city.confirmed,
				//  	dth:city.deceased,
				//  	actv:city.active,
				//  	new:city.newconfirmed,
				//  }
				 
				//  if(stats.new!=0){
				//  
				// }
				// else{
				// 	console.log("no new case");
				// }
				// else{
				// 	console.log("no new case");
				// }
			//}
				
	//}
//});
				// var query=Covid.find({'name':'Jaipur'});
				// // if(stats.cnf==
				// console.log(query.select('confirmed'));
				// // {
				// console.log("new active cases"+stats.actv)
				// Covid.updateOne(stats)
				// }
				// else{
				// 	console.log("no new case");
				// }


				 // Covid.create({
				 // 	name:stats.nme,
					// confirmed:stats.cnf
				 // },function(err,response){
				 // 	if(err){
				 // 		console.log(err)
					// 	 }
					// 	 else{
					// 	 	console.log("successfully created")
					// 	 }
				 // });
				//console.log(stats.cnf)
				// Covid.find({},function(err,data){
				// 	if(err)
				// 		console.log(err);
				// 	console.log(" no data");
				// });	 
	
	//console.log("COVID 19 ALERT!!!\nCases in  Jaipur:\nConfirmed: "+confirmedcases +"\nDeaths: "+deaths +"\nNew Cases: " +newcases );


	//a=(parsedData.data[1].active).toString()
	//console.log(typeof a)
	//res.send(parsedData);
	


app.get("/",function(req,res){
	res.send("hello");
})
