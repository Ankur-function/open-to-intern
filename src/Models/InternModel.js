const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({

    "name": {
        type: String,
        required: true
    },

     "email": {
        type: String,
        validate:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email"],
    
        unique: true,
    },
      "mobile": {
          type : String,
          required : true,
         validate: [/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 'Please provide valid mobile number'],

        unique : true
    }, 
      "collegeId": {
         type: ObjectId, ref : "college" ,
        required : true,

        }, 
    "isDeleted": {
        type : Boolean,
         default: false}

     },{ timestamps: true })

    module.exports = mongoose.model("intern", internSchema)



