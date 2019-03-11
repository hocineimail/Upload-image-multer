var express = require('express');
var server = express();
var path = require("path")
var bodyParser = require("body-parser");


// routes


server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

//using folder views
server.use(express.static(__dirname + '/public'))
server.engine('ejs', require('ejs').renderFile)
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')

server.get("/", (req,res)=> {
  res.render("index")
})

server.listen(3000, () => {
  console.log('Server listing on 3000')
})
