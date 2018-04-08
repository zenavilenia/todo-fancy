const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username required'],
        unique: [true, 'Username already taken']
    },
    email: {
        type: String,
        require: [true, 'Email required'],
        unique: [true, 'Email already exits'],
        validate: {
            validator: function(email) {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
            },
            message: 'Email not valid'
        } 
    },
    password: {
        type: String,
        require: [true, 'Password required'],
        min: [6, 'Password too short']
    }
}, {
    timestamps: true
})

let user = mongoose.model('user', userSchema)

module.exports = user