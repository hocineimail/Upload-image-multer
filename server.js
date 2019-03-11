const express = require('express');
const server = express();
const path = require("path")
const multer = require('multer');
const bodyParser = require("body-parser");



// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage, 
 //You ccan change filsesize
  limits: { fileSize: 50000000 },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('Picter');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Message error!');
  }
}

// Init server



server.get('/', (req, res) => 
  res.render('index')
  );

server.post('/Post', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
          console.log('Error: No File Selected!')
        res.render('index');

      } else {
        console.log('File Uploaded!')
         console.log(req.file.filename)
        res.render('index');

      }
    }
  });
});


server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

//using folder views
server.use(express.static(__dirname + '/public'))
server.engine('ejs', require('ejs').renderFile)
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')


server.listen(3000, () => {
  console.log('Server listing on 3000')
})
