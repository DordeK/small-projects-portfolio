// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var port =process.env.PORT || 3000
let bodyParser = require('body-parser')
let multer = require('multer')
var apiRoutes         = require('./routes/api.js');
let path = require('path')

require('dotenv').config()




var cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); 


app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    next()
  })
  
  
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.html');
  });

  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/drummachine', function (req, res) {
    res.sendFile(__dirname+'/build/index.html');
  });

  app.get('/randomquotemachine', (req, res, next) =>{
    res.sendFile(__dirname + '/views/randomquotemachine.html')
  })


  app.use(express.static(path.join(__dirname, 'buildMarkdown-Previever')));
  app.get('/markdownpreviever',(req,res)=>{
    res.sendFile(__dirname+'/buildMarkdown-Previever/index.html');
  })


app.get('/api/shorturl/new', (req, res, next) =>{
  res.sendFile(__dirname + '/views/urlshortner.html')
})
app.get('/api/exercise/add', (req, res, next) =>{
  res.sendFile(__dirname + '/views/exercisetracker.html')
})

app.get('/api/filemetadata', (req, res, next) =>{
  res.sendFile(__dirname + '/views/filemetadata.html')
})


app.get('/api/timestamp/:date_string', function (req, res){
      let resultArray={}
      var input = req.params.date_string;

      if(input.includes('-')){
        resultArray['unix'] = new Date(input).getTime();
        resultArray['utc'] = new Date(input).toUTCString()
      }else {
        input = parseInt(input)
        resultArray['unix'] = new Date(input).getTime();
        resultArray['utc'] = new Date(input).toUTCString()
      }

      if(!resultArray['unix'] || !resultArray['utc']){
        res.json({"error" : "Invalid Date" })
      }
        res.json(resultArray)
})




let url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser : true, useUnifiedTopology: true });


let urlSchema = new mongoose.Schema({
  original_url: {type: String, required: true},
  short_url: Number,
})

let Url = mongoose.model('Url', urlSchema)

let responseObj = {}

app.post('/api/shorturl/new', bodyParser.urlencoded( { extended: false} ), (req, res) => {
let inputUrl = req.body['url']
responseObj['original_url']= inputUrl

let inputShort = 1;

Url.findOne({})
  .sort({short_url: 'desc'})
  .exec((err, result) =>{
    if(!err && result != undefined){
      inputShort = result.short_url + 1;
    }
     if (!err){
      Url.findOneAndUpdate(
        {original_url: inputUrl},
        {original_url: inputUrl, short_url: inputShort },
        {new: true, upsert: true},
        (err, savedUrl)=>{
          if(!err){
            responseObj['short_url'] = savedUrl.short_url;
            res.json(responseObj)
          }
        }
      )
    }
  })
})

app.get('/api/shorturl/:input',(req, res) =>{
  let input = req.params.input
      Url.findOne({short_url: input}, (err, result) => {
        if(!err && result != undefined){
          res.redirect(result.original_url)
        }else{
          res.json('{error: url not found}')
        }
      })
  }
)

let exercisesSesionsSchema = new mongoose.Schema({
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: String
})

let userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  log: [exercisesSesionsSchema]
})

let Sessions = mongoose.model('Sessions', exercisesSesionsSchema)
let User = mongoose.model('User', userSchema)


app.post('/api/exercise/new-user', bodyParser.urlencoded( { extended: false} ), (req, res) => {
  let inputUser = req.body['username']
  let newUser = new User({username: inputUser})
    newUser.save((err, savedUser) =>{
      if(err){
        console.log(err)
      } else{
        let responseObj = {}
        responseObj['username'] = savedUser.username
        responseObj['_id'] = savedUser.id
        res.json(responseObj)
      }}
    )
})

app.get('/api/exercise/users', (req,res) =>{
  User.find({}, (err, arrOfUsers) => {
    if(!err){
      res.json(arrOfUsers)
    }
  })
})


app.post('/api/exercise/add', bodyParser.urlencoded( { extended: false} ), (req, res) => {
  let body = req.body;
  let newSession = new Sessions({
    description: body.description,
    duration: parseInt(body.duration),
    date: body.date
  })

  if(newSession.date == ''){
    newSession.date = new Date().toISOString().substring(0, 10)
  }

User.findByIdAndUpdate(
  req.body.userId,
  {$push : {log: newSession}},
  {new: true},
      (err, updatedUser) => {
        if(err){
          console.log('user not found')
        }
        if(!err){
        let responseObject = {}
        responseObject['username'] = updatedUser.username
        responseObject['_id'] = updatedUser.id
        responseObject['description'] = newSession.description
        responseObject['duration'] = newSession.duration
        responseObject['date'] = new Date(newSession.date).toDateString()
        res.json(responseObject)
      }
    }
 )
})

app.get('/api/exercise/log', (req, res) =>{
  User.findById(req.query.userId, (err, result) => {
    let responseObject = result
    responseObject['count'] = result.log.length
    if(req.query.from || req.query.to){
          let fromDate = new Date(0);
          let toDate = new Date();

            if(req.query.to){
              toDate = new Date(req.query.to)
            }

            if(req.query.from){
              fromDate = new Date(req.query.from)
            }

            fromDate = fromDate.getTime()
            toDate = toDate.getTime()
            console.log(toDate, fromDate)

            responseObject.log= responseObject.log.filter((session) =>{
              let sessionDate = new Date(session.date).getTime()

              if(sessionDate >= fromDate && sessionDate <= toDate){
                return sessionDate
              }})
      }

      if(req.query.limit){
        responseObject.log = responseObject.log.slice(0, req.query.limit)
      }
    res.json(responseObject)
  })
})




let dataInformationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: String,
  size: Number
})

let dataInformation = mongoose.model('dataInformation', dataInformationSchema)



app.post('/api/fileanalyse', multer().single('upfile'), (req, res) =>{
  let data = req.file
  
  let newData = new dataInformation({  name: data.originalname,type: data.mimetype,size:  data.size})



       newData.save((err, savedData) =>{
        if(err){
          console.log(err)
        }else{
          console.log(savedData);
          let responseObject = {}
          responseObject['name'] = savedData.name;
          responseObject['type'] = savedData.type;
          responseObject['size'] = savedData.size
          res.json(responseObject)
        }
      })


})

app.route('/api/convert')
  .get(function (req, res) {
    res.sendFile(__dirname + '/views/metricconverter.html');
  });

//metric converter routes
apiRoutes(app);

// listen for requests :)
var listener = app.listen(port,  function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
