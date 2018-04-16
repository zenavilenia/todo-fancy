const router = require('express').Router()
const {listTodo, addTodo, editTodo, deleteTodo, editTask, editBgcolor} = require('../controllers/todo.controller')
const {auth} = require('../middleware/auth');

router
    .get('/', auth, listTodo)
    .post('/', auth, addTodo)
    .put('/', auth, editTodo)
    .put('/task', auth, editTask)
    .put('/bgColor', auth, editBgcolor)
    .delete('/:id', auth, deleteTodo)

module.exports = router