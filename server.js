const express = require("express")
const mongoose = require('mongoose')

const { User } = require("./database/schema/user")
const { Message } = require("./database/schema/message")

let app = express()

// app.use(cors())
app.use(express.json())

// connection to the database 
try {
    mongoose.connect("mongodb+srv://Amine:Chatapp01@chattapp.enxz8.mongodb.net/ChattApp?retryWrites=true", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    console.log(`\t-Successful connection to the database.`)
} catch (error) {
    console.error(`Error: ${error.message}`)
}

// create user route
// if you want to create a new user you have to send a request to /crateuser with a body of [email,password,userName]
app.post('/createUser', async function (req, res) {

    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
    })

    try {
        await newUser.save()
        res.status(201).json("the user has been created successfully")
    } catch (error) {
        console.log(error);
    }
})

// delete user route
// if you want to delete a user you have to send a request to /deleteUser with a body of [id] => the id of the specific user
app.post('/deleteUser', async function (req, res) {
    try {
        await User.findByIdAndDelete({ _id: req.body.id })
        res.status(200).json("the user has been deleted successfully")
    } catch (error) {
        console.log(error);
    }
})

// update user route
// if you want to update a user you have to send a request to /updateUser with a body of [id] => the id of the specific user and [email,password,userName]
app.post('/updateUser', async function (req, res) {
    try {
        await User.findByIdAndUpdate({ _id: req.body.id }, {
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName,
        })
        res.status(200).json("the user has been updated successfully")
    } catch (error) {
        console.log(error);
    }
})

// this is a route to record a message on the database based on the socket io system ....
app.post('/postMessage', async (req, res) => {
    const newMessage = new Message({
        from: req.body.from,
        to: req.body.to,
        message: req.body.message,
    })

    try {
        await newMessage.save()
        res.status(201).json("message sent successfully")
    } catch (error) {
        console.log(error);
    }
})

app.listen(9000, async () => {
    console.log("the server is runing on the port 9000 ...");
})