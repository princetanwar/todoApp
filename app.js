const express = require('express')
const app = express()
const routes = require("./config/routes")
const port = 3000 || process.env.EXPRESS_PORT
require('./config/connection')

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));
app.use(routes)

app.listen(port, (req, res) => {
    console.log(`This application run on port number ${port}`)
})