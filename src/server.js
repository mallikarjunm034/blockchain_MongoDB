console.log("welcome ReactJS")
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient


var db

MongoClient.connect('mongodb://localhost:27017/block_chaindb', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  var myobj = { name: "kumar ", address: "kerala 37" };
  db = client.db('block_chaindb') .collection("users").insertOne(myobj,(err, res)=>{

    if (err) throw err;
    console.log("1 document inserted");
  
  })
  app.listen(3000, () => {
    console.log('listening on connected DB')
  })
})


app.post('/savedetails', (req, res) => {
  
  client.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  var cursor = db.collection('users').find()
  console.log("data"+cursor)
})

// app.post('/quotes', (req, res) => {
//   console.log(req.body)
// })
//   app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
//   })

