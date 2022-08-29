// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req,res) => {
  let currentDate = new Date();
  let unix = currentDate.getTime();
  let currentUTC = currentDate.toUTCString();

  res.json({unix: unix, utc: currentUTC})
})

app.get('/api/:date', (req,res) => {
  let paramDate = req.params.date //date obtained
  console.log(paramDate)
  let date;
  let unix;
  let dateUTC;
  let regex = /[a-z]/
  //handle string dates
  if(paramDate.includes("-") || regex.test(paramDate) ){
  date = new Date(paramDate);
  console.log(date)
  unix = date.getTime();
  dateUTC = date.toUTCString()
  }else{
  //handle millisecconds
  paramDate = parseInt(paramDate)
  date = new Date(paramDate)//get date
  unix = date.getTime();
  dateUTC = date.toUTCString();
  }
  
  if(date == "Invalid Date"){
      return res.json({error: "Invalid Date"})
  }
  
  res.json({unix: unix, utc: dateUTC})
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


//THINGS TO DO:
//FIRST I HAVE TO HANDLE THE GET REQUEST TO /api, and add the parametters for the date

//in that function i need to handle the parameters, check the format, and use the Date methods to parse it, if the format is miliseconds, y store it in Unix variable, and calculate the utc values, if the format is a date, I use it with parse date to obtain milisecons, then I have to use the methods of date, to get the utc values, for day of the week, I use Date getUTCDay, maybe I have to parse it, for day number Data.getUtcDate,, for month, getUtcMonth, for year getUTCfullYear, for hour, getHours, for minutes, getMinutes & for secconds get seconds, then i put all inside a variable and pass it to the json response 

