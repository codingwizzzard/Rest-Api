const { Router } = require("express");
const { getUser, deleteUser, updateUser, signUp, login } = require("../controllers/controller");

const userRouter = Router()

userRouter.get('/', getUser)
userRouter.post('/add', signUp)
userRouter.delete('/delete/:id', deleteUser)
userRouter.patch('/update/:id', updateUser)
userRouter.post('/login', login)

module.exports = userRouter