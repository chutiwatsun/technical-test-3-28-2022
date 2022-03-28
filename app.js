/*
Main server application first makesure to do npm install the run node server
First connect to the data base to check if this database has data
Upload csv to the database after select upload
All list of item from data base will display
Second go to http://localhost:3000/api/data for database vitualization 
of the table
*/

var express     = require('express');
var mongoose    = require('mongoose');
var multer      = require('multer');
var path        = require('path');
var csvModel    = require('./models/csv');
var csv         = require('csvtojson');
var bodyParser  = require('body-parser');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

var uploads = multer({storage:storage});

//connect to database
mongoose.connect('mongodb://localhost:27017/csvdatabase',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));

//static folder
app.use(express.static(path.resolve(__dirname,'public')));

//Load page for main page(upload page)
app.get('/',(req,res)=>{
    csvModel.find((err,data)=>{
         if(err){
             console.log(err);
         }else{
              if(data!=''){
                  res.render('display',{data:data});
              }else{
                  res.render('display',{data:''});
              }
         }
    });
});



app.get('/api/data',(req, res) => {
    
    csvModel.find((err,data)=>{
        if(err){
            console.log(err);
        }else{

             if(data!=''){
                res.render('display2',{data:data});
             }else{
                res.render('display2',{data:''});
              
             }
        }
    });
});


var temp ;

app.post('/',uploads.single('csv'),(req,res)=>{
 //convert csvfile to jsonArray will repeat until the end of the object  
csv()
.fromFile(req.file.path)
.then((jsonObj)=>{
    console.log(jsonObj);
    for(var x=0;x<jsonObj;x++){
         temp = parseFloat(jsonObj[x].ID)
         jsonObj[x].ID = temp;
         temp = parseFloat(jsonObj[x].AccountID)
         jsonObj[x].AccountID = temp;
         temp = parseFloat(jsonObj[x].Area)
         jsonObj[x].Area = temp;
         temp = parseFloat(jsonObj[x].Gender)
         jsonObj[x].Gender = temp;
         temp = parseFloat(jsonObj[x].MultipleLines)
         jsonObj[x].MultipleLines = temp;
         temp = parseFloat(jsonObj[x].InternetService)
         jsonObj[x].InternetService = temp;
         temp = parseFloat(jsonObj[x].PhoneService)
         jsonObj[x].PhoneService = temp;
         temp = parseFloat(jsonObj[x].StreamingTV)
         jsonObj[x].StreamingTV = temp;
     }
     csvModel.insertMany(jsonObj,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
     });
   });
});



//assign port for local enviroment
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));