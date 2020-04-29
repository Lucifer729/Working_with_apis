var request=require('request');
	express=require('express');
	app=express();
	twilio=require("twilio")
	CronJob=require("cron").CronJob;
	mongoose=require("mongoose");
	ping = require('periodic-ping').ping;
	//var confirmedcases,deaths,active,newcases,recovered;
	// const Nexmo = require('nexmo')

	// const Nexmo = require('nexmo');

// const nexmo = new Nexmo({
//   apiKey: '365e0162',
//   apiSecret: 'LsxZDccdDX5XzlwN',x
// });

//mongoose.connect('mongodb://localhost:27017/covid_app',{useNewUrlParser:true,useUnifiedTopology:true})  


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

//var url = process.env.MONGOLAB_URI;
var arr=['+918630757295','+918077877966','+918619076613','+919456667451'];

const myPingConfig = {
  appName: "myfirstdeployy",
  wakeTime: 3,
  wakeAm: true,
  sleepTime: 8,
  sleepAm: false,
  frequency: 600000
};


 mongoose.connect("mongodb+srv://amulya:Amulya29@@cluster0-mxqpw.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to mongoose server");
}).catch(err => {
	console.log("ERROR", err.message);
});

//mongoose.connect('mongodb://localhost:27017/covid_app',{useNewUrlParser:true,useUnifiedTopology:true})  

//,{useNewUrlParser:true,useUnifiedTopology:true})
var covidSchema=new mongoose.Schema({
	name:String,
	confirmed:Number
	// dth:Number,
	// actv:Number,
	// new:Number,
	// recvr:Number
});
var Covid=mongoose.model("Covid",covidSchema);

// 

var client = new twilio('AC81bad57961d2f256bae9d7d47a17975a','eb17dc86afbc9181ff3e3b819372779e');

//bs deploy ke lye hai baad me delete krna hai
// Covid.create({
// 		 	name:"Aligarh",
// 			confirmed:11
// 		  },function(err,response){
// 		 	if(err){
// 		 		console.log(err)
// 			 	 }
// 			 	 else{
// 			 	 	console.log("successfully created")
// 			 	 }
// 			 });

//var a;
var job=new CronJob('*/25 * * * *',function(){
	var options = {
			method: 'GET',
			url: 'https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaDistrictWiseDataForState',
			qs: {statecode: 'UP'},
			headers: {
				'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com',
			    'x-rapidapi-key': 'bf75e041c8msh13265b677eb9845p164888jsn89f3a2ef44f1'
			}
	};
request(options, function (error, response, body) {
	if (error) throw new Error(error);
	else{
		var parsedData=JSON.parse(body);
		//console.log(body);
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
						arr.forEach(function(val){
						client.messages.create({
						  to: val,
						  from: '+18634501351',
						  body: "COVID 19 ALERT!!!\n" +"***Aligarh***\nNew Case: "+city.newconfirmed + "\nConfirmed: "+city.confirmed +"\nDeaths: "+city.deceased + "\nActive: "+city.active
						}).then(message => console.log(message.status));
					});
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

ping(myPingConfig);

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
