const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./Data");
const Patient = require("./Patient");

const cors = require('cors');

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://mallikarjun:welcome123@ds143953.mlab.com:43953/block_chaindb";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Patient.find({},function(err, users) {
    if (err) return res.json({ success: false, error: err });
    // return res.json({ data });
    return res.json({ success: true, users });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


router.post("/register", (req, res) => {
 let data = new Patient();

  const { firstName, lastName,username,password,gender,email,phoneNo,dob } = req.body;
  data.id = 1;
  data.firstName = firstName;
  data.lastName = lastName;
  data.username = username;
  data.password = password;
  data.gender = gender;
  data.email = email;
  data.phoneNo = phoneNo;
  data.dob = dob;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });

});

router.post("/login",(req,res)=>{

    const {username,password} = req.body;
    let query = {username:username,password:password};

// console.log(query);
    Patient.findOne(query,function(err, data) {
    if (err) return res.json({ success: false, error: err });
    if(data){return res.json({ success: true, user: data }); }
    else {       res.statusMessage = "Current password does not match";
          return res.status(404).json({ success: false});
        }
    
  });

    // Patient.findOne({},function(err,user){
    //   if (err) return res.json({ success: false, error: err });
    //   if(user.length){
    //     return res.json({ success: true, user: user });
    //   } else {
    //     return res.json({ success: false, user: {msg:'User not Exist'} });
    //   }
    // });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));