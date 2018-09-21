const db = require('../models/index.js');
const User = db.user;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require('express');
var app = express();
var config = require('../config/config.js'); // get our config file
app.set('superSecret', config.secret); // secret variable
var Sequelize = require('sequelize');
const sequelize = new Sequelize('userdatabase', 'root', 'parathan@4998', {
    dialect: 'mysql'
  });
//const Book = db.book;

exports.create = (req, res) => {
    const {
        first_name,
        last_name,
        number,
        email,
        password: password,
    } = req.body;
    User.create({
        first_name: first_name,
        last_name: last_name,
        number: number,
        email: email,
        password: password,
    })
        .then(data => res.status(201).json({
            message: 'New User has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.findAll({})
        .then(user => res.json({
            data: user,
            message: 'You got the details of All Users'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};


// Find a single User with a userId
exports.findOne = (req, res) => {
    //Get One User using ID
    const user_id = req.params.user_id;
    User.findOne({
        where: {
            user_id: user_id
        }
    }, )
        .then(user => res.status(201).json({
            data: user,
            message: 'You Got the User detail with Id:' + user_id
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
    const user_id = req.params.user_id;
    const { first_name, last_name, number, email, password } = req.body;
    User.update({
        first_name: first_name,
        last_name: last_name,
        email: email,
        number: number,
        password: password,
    }, {
            where: {
                user_id: user_id
            }
        })
        .then(user => res.status(201).json({
            message: 'User has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    const user_id = req.params.user_id;

    User.destroy({
        where: {
            user_id: user_id
        }
    })
        .then(status => res.status(201).json({
            message: 'User has been delete.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

// Retrieve and return all Users above User input Params
exports.getage = (req, res) => {
    sequelize.query('SELECT * FROM users WHERE age>' + req.params.age, { type: sequelize.QueryTypes.SELECT })
        .then(users => {
            res.json({
                data: users,
                message: 'You got the details of All Users'
            })
        })
};

// Find a single User with a userId
exports.logincheck = (req, res) => {

const email = req.body.email;
const password = req.body.password;

    // User.verifyCredentials({ username: username, password : password }, (error, response) => {

        // if(error) return res.;


        // return res.su;


    // });


    User.findOne({
        where: {
            email: email
        }
     }).then((user) => {

        if(user){

            user.comparePassword(password, (error, response) => {
                if(error) return res.status(401).json(handleUnAuthorizedError);

                if(response) {
                    const payload = {
                        email: email
                    };
                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn: '24h' // expires in 24 hours
                    });
        
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                } else {
                    return res.status(401).json(handleUnAuthorizedError);
                }

            });
        } else {
            res.status(401).json(handleUnAuthorizedError);
        };

    }).catch((error) => res.status(401).json(handleUnAuthorizedError));
};

let handleUnAuthorizedError = {
    success: false,
    message: 'UnAuthorized',
    token: null
}