const express = require('express')
const db = require('./config/database')

const app = express()

app.listen(1303, (err) => {
    db()
    if (err) {
        console.log(err)
    }
    console.log("server started at http://localhost:1303")
})