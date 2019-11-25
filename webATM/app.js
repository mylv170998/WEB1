const express=require("express")
const handlebars=require("express-handlebars")
let app=express()
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.get("/login",(req,res)=>{
    res.render("login")
})
const homeRouter=require("./routers/homeRouter")
const loginRouter=require("./routers/loginRouter")
app.use("/",homeRouter)
// app.use("/login",loginRouter)
const mongoose =require("mongoose")


mongoose.connect("mongodb://localhost/webATM",{useNewUrlParser:true},(err)=>{
  if (err) {console.log(err)}
  else {console.log("db connected")}
})


app.listen(5000,(err)=>{
    if (err) {console.log(err)}
    else {console.log("app listen at 5000!")}
})