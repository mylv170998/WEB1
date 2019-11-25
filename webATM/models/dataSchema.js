const mongoose =require("mongoose")
const Schema =mongoose.Schema
const userSchema = new Schema ({
    username : String,
    password :String
},{
    _id=true,
    timestamps:true
})

var user=mongoose.model("user",userSchema)
module.exports= user