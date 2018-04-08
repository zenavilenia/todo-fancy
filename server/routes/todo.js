const router = require('express').Router()
const {listTodo, addTodo, editTodo, deleteTodo} = require('../controllers/todo.controller')
const {auth} = require('../middleware/auth');

router
    .get('/', auth, listTodo)
    .post('/', auth, addTodo)
    .put('/', auth, editTodo)
    .delete('/', auth, deleteTodo)

module.exports = router