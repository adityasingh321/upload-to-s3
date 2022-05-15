require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const AWS=require("aws-sdk");
const mongoose = require("mongoose");
const dbUrl="mongodb://localhost:27017/WebGhat-Demo";
const {upload} = require('./multer/upload')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}));

const my_AWSAccessKeyId = process.env.aws_access_key;
const my_AWSSecretKey = process.env.aws_secret_key;
const aws_region = process.env.aws_region;

AWS.config.update({
  region: aws_region,
  accessKeyId: my_AWSAccessKeyId,
  secretAccessKey: my_AWSSecretKey,
  AWS_SDK_LOAD_CONFIG:1
});

var s3=new AWS.S3();

const connectDB = () => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true
    });
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });
};

app.get('/',function(req,res){
    console.log(process.env.aws_bucket_contact_lists);
    res.render('form')
})

app.post('/',upload.single('csvfile') ,function(req,res) {
    console.log(req.file)
    console.log(req.file.originalname)


    let newfilename = `${req.body.listTitle}_${req.file.originalname.split('.')[0]}_${Date.now()}.csv`;

    console.log(newfilename);
  
    let params = {
      Bucket: process.env.aws_bucket_contact_lists,
      Key: newfilename,
      Body:req.file.buffer
    };

    s3.upload(params,async(err,data)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.send(data)
        }
    })
    
})


app.listen(3000, function(){
    console.log('Server has started on port 3000.');
})




connectDB();