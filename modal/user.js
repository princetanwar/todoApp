const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const JSONToken = require("jsonwebtoken")
const SECRET_KEY = "eyJhbGciOiJIUzI1NiJ9eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLC"

const registerSchema = new mongoose.Schema({
    userId:{
        type:Number,
        unique:true
    },
    firstname:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phonenumber:{
        type: Number,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String
        }
    }]
})

// Middleware for genrate JWT token
registerSchema.methods.genrateJwtToken = async function(){
    try{
        let makeToken = await JSONToken.sign({_id:this._id}, SECRET_KEY)
        this.tokens = this.tokens.concat({token:makeToken})
        this.save()
    }catch(error){
        console.log(`Error of genrate token ${error}`)
    }
}

// Middleware for password hashing
registerSchema.pre("save", async function(next){
    try{
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password, 8);
            this.confirmpassword = await bcrypt.hash(this.confirmpassword, 8);
        }else{
            next();
        }
    }catch(error){
        console.log("error in password hashing", error);
    }
    next();
})

const Register = new mongoose.model("User", registerSchema)

module.exports = Register