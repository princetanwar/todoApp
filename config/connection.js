const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/todoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connection succesful"))
.catch(err => console.log("database not connected", err))