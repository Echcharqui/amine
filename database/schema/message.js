// this is the message schema that take as fields 
// from => is the id of the user who send the message
// to => is the id of the user who gonna recieve the message
// message => is what was witting as message

const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({

    from: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },

    to: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },

    message: {
        type: String,
        require: true
    }


}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

module.exports = { Message }
