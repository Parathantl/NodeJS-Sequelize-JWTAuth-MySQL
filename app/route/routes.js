module.exports = (app) => {

    const users = require('../controller/user-controller.js');
    const books = require('../controller/book-controller.js');
    const authors = require('../controller/author-controller.js');
    const borrows = require('../controller/borrow-controller.js');
    const query =require('../controller/query-controller.js');
    
    //Users
    app.post('/users', users.create);

    app.post('/login', users.logincheck);

    app.get('/users',tokencheck, users.findAll);

    app.get('/users/:user_id', users.findOne);

    app.put('/users/:user_id', users.update);

    app.delete('/users/:user_id', users.delete);

    //Books
    app.post('/books', books.create);

    app.get('/books', books.findAll);

    app.get('/books/:book_id', books.findOne);

    app.put('/books/:book_id', books.update);

    app.delete('/books/:book_id', books.delete);

    //authors
    app.post('/authors', authors.create);

    app.get('/authors', authors.findAll);

    app.get('/authors/:author_id', authors.findOne);

    app.put('/authors/:author_id', authors.update);

    app.delete('/authors/:author_id', authors.delete);

    //Borrow
     app.post('/borrows', borrows.create);

     app.get('/borrows', borrows.findAll);

     app.get('/borrows/:borrow_id', borrows.findOne);

     app.put('/borrows/:borrow_id', borrows.update);

     app.delete('/borrows/:borrow_id', borrows.delete);

     //query
     app.get('/details', query.getborrow);

     app.get('/bookdetail', query.getbook);

}

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express 	= require('express');
var app         = express();
var config = require('../config/config.js'); // get our config file
app.set('superSecret', config.secret); // secret variable

const tokencheck = (req, res, next)=> {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), (err, decoded) => {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  };