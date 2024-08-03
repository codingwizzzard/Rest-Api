const userDB = require("../models/schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signUp = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        await userDB.create({ username, email, password: hashPassword })
        res.status(200).send("User added...")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body

    try {
        let user = await userDB.findOne({ username: username })

        if (!user) {
            return res.send("User not verfied")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            let payload = { username: user.username }
            const token = jwt.sign(payload, "private-key")
            res.cookie("token", token).send("User Logged in successfully...")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.deleteUser = async (req, res) => {
    let { id } = req.params
    try {
        await userDB.findByIdAndDelete(id)
        res.status(200).send("User deleted...")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.updateUser = async (req, res) => {
    let { id } = req.params
    try {
        await userDB.findByIdAndUpdate(id, req.body)
        res.status(200).send("User updated...")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getUser = async (req, res) => {
    const data = await userDB.find({})
    res.status(200).send(data)
}