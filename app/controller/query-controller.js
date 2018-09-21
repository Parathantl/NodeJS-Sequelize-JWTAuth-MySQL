const db = require('../models/index.js');

const Sequelize = require('sequelize');
var sequelize = new Sequelize('userdatabase', 'root', 'parathan@4998', {
    dialect: 'mysql',
  });

exports.getborrow = (req, res) => {
    sequelize.query('SELECT book_name, first_name FROM users,books, borrows WHERE users.user_id = borrows.user_id and books.book_id = borrows.book_id', { type: sequelize.QueryTypes.SELECT})
    .then(books => {
        res.json({
            data: books,
            message: 'You got the details of All Books'
        })    
    })
    };

    exports.getbook = (req, res) => {
        sequelize.query('    SELECT book_id, book_name,author_name FROM books,authors WHERE books.author_id= authors.author_id', { type: sequelize.QueryTypes.SELECT})
        .then(bookdetails => {
            res.json({
                data: bookdetails,
                message: 'You got the details of All Books'
            })    
        })
        };