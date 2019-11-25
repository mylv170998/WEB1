const express = require("express")
const handlebars = require("express-handlebars")
const fs = require("fs")
const bodyParser = require('body-parser')
const path = require("path")
let app = express()
app.use((bodyParser.urlencoded({ extended: false })))
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.get("/login", (req, res) => {
  res.render("login")
})
app.post("/login", (req, res) => {
  let username = req.body.user
  let password = req.body.password
  fs.readFile("data.json", "utf8", (err, data) => {
    
      let objData=JSON.parse(data)
      if (username == objData.userName &&
        password == objData.passWord) {
        res.render("mainPage")
      }
      else {
        res.render("login", { loginStatus: "Đăng nhập thất bại" })
      }
  })
})
app.get("/abc",(req,res)=>{
  res.render("changePass")
})

app.post("/changePass",(req,res)=>{
  let oldPass=req.body.password
  let newPass1=req.body.newpass1
  let newPass2=req.body.newpass2
  fs.readFile("data.json","utf8",(err,data)=>{
     objData=JSON.parse(data)
     if (objData.passWord==oldPass){
        if (oldPass==newPass1){
          res.render("changePass",{loginStatus:"Mật khẩu mới đã trùng với mật khẩu cũ ,mời bạn thử mật khẩu khác!"})
        }else{
          if (newPass1==newPass2){
            let newData ={
              userName:objData.userName,
              passWord:newPass2,
              sotk:objData.sotk,
              sodu:objData.sodu
            }
            let newdata =JSON.stringify(newData)
            fs.writeFile("data.json",newdata,"utf8",(err)=>{
              if(err){console.log(err)}
              else{
                res.render("changePass",{loginStatus:"Đổi mật khẩu thành công"})
              }
            })
          }else{
            res.render("changePass",{loginStatus:"Bạn đã nhập sai mật khẩu mới"})
          }
        }
     }
     else{
       res.render("changePass",{
         loginStatus:"Bạn đã nhập sai mật khẩu"
       })
     }
  })
})
app.get("/transfer",(req,res)=>{
  res.render("Transfer")
})
app.post("/Transfer",(req,res)=>{
  let soTK2=req.body.sotk2
  let Money=req.body.money 

  fs.readFile("data1.json","utf8",(err,data1)=>{
    objData1=JSON.parse(data1)
  })
  fs.readFile("data.json","utf8",(err,data)=>{
    objData=JSON.parse(data)
    if (soTK2==objData1.sotk){
      if( Money >objData.sodu){
             res.render("Transfer",{loginStatus:"Số dư không đủ để thực hiện giao dịch"})
      }else{
        let sodumoi=objData.sodu-Money
          objData1.sodu= objData1.sodu + Money
        let newData={
           userName:objData.userName,
           passWord:objData.passWord,
           sotk:objData.sotk,
           sodu:sodumoi
        } 
        let newData2={
          userName:objData1.userName,
          passWord:objData1.passWord,
          sotk:objData1.sotk,
          sodu:objData1.sodu
        }
        let newdata=JSON.stringify(newData)
        let newdata1=JSON.stringify(newData2)
        fs.writeFile("data.json",newdata,"utf8",(err)=>{
          if (err){console.log(err)}
          else{
            res.render("Transfer",{loginStatus:"Giao dịch thành công!"})
          }
        })
        fs.writeFile("data1.json",newdata1,"utf8",(err)=>{
          if(err){console.log(err)}
          else(console.log("ok cmnr!"))
        })
      }
    }else{
      res.render("Transfer",{loginStatus:"Bạn đã nhập sai số tài khoản người nhận"})
    }
  })
})

app.listen(5000, (err) => {
  if (err) { console.log(err) }
  else { console.log("app listen at 5000!") }
})