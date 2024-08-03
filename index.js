const express = require('express')
const db = require('./config/database')
const userRouter = require('./routers/router')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use('/api', userRouter)

const port = 1303

app.listen(port, (err) => {
    db()
    if (!err) {
        console.log("Server started at http://localhost:" + port)
    }
})