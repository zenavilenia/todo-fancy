const router = require('express').Router()
const {homepage, signin, signup, loginFb} = require('../controllers/index.controller')

router
    .get('/', homepage)
    .post('/signin', signin)
    .get('/loginFb', loginFb)
    .post('/signup', signup)

module.exports = router