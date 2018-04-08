const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mUser = require('../models/user.model')

module.exports = {
    homepage: (req, res) => {
        
    },
    signin: (req, res) => {
        let email = req.body.email
        let password = req.body.password

        mUser.findOne({
            email
        }, (err, user) => {
            if(err) {
                res.status(400).send({
                    message: err.message
                })
            } else {
                bcrypt.compare(password, user.password, function(err, res2) {
                    if(err) {
                        res.status(400).send({
                            message: err.message
                        })
                    } else {
                        if(res2) {
                            let token = jwt.sign(
                                {
                                    id: user._id,
                                    email: user.email
                                },
                                process.env.SECRET)
                            console.log("token=--", token);
                            res.status(200).json({
                                message: "login success",
                                token: token,
                                user: user
                            })
                            
                        } else {
                            res.status(500).json({
                                message: "login failed"
                            })
                        }
                    }
                });
            }
        })
    },
    signup: (req, res) => {
        let username = req.body.username
        let email = req.body.email
        let password = req.body.password
        bcrypt.hash(password, 10, function(err, hash) {
            if(err) {
                res.status(500).json({
                    message: err
                })
            } else {
                password = hash;
                let user = new mUser({
                    username, email, password
                })

                user.save((err, result) => {
                    if(err) {
                        res.status(400).send({
                            message: err.message
                        })
                    } else {
                        res.status(201).send({
                            message: 'sign up success',
                            data: result
                        })
                    }
                })
            }
        });
    }
}