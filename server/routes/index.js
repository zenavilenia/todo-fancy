const router = require('express').Router()
const {homepage, signin, signup} = require('../controllers/index.controller')

router
    .get('/', homepage)
    .post('/signin', signin)
    .post('/signup', signup)

module.exports = router