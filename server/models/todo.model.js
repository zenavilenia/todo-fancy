const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  task: {
    type: String,
    require: [true, 'Task required']
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  bgColor: String
}, {
  timestamps: true  
})

let todo = mongoose.model('todo', todoSchema)

module.exports = todo