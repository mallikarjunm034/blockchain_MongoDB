// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 

const PatientSchema = new Schema(
  {
    id: Number,
    firstName:String,
    lastName:String,
    username:String,
    password:String,
  	gender:String,
  	email:String,
  	phoneNo:String,
  	dob:String
  },
  { timestamps: true }
);


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Patient", PatientSchema);