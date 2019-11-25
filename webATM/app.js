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
  fs.readFile('dangnhap.json', 'utf-8', (err, docs) => {
    if (err) { console.log(err) }
    else {
      let objData = JSON.parse(docs)
      console.log(docs)
      console.log(username,password)
      if (username == objData.userName && password == objData.passWord) {
        res.render("main")
      }
      else {
        res.render("login", { loginStatus: "Đăng nhập thất bại" })
      }
    }
  })
})






app.listen(5000, (err) => {
  if (err) { console.log(err) }
  else { console.log("app listen at 5000!") }
})