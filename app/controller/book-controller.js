const db = require('../models/index.js');
const Book = db.book;

//const Author= db.author; 
//const User = db.user;

exports.create = (req, res) => {
    const {
        book_name,
        author_id
    } = req.body;
    Book.create({
        book_name: book_name,
        author_id: author_id
    })
        .then(data => res.status(201).json({
            message: 'New Book has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));    
};

// Retrieve and return all Books from the database.
exports.findAll = (req, res) => {
Book.findAll({})
    .then(books => res.json({
        data: books,
        message: 'You got the details of All Books'
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
};


// Find a single Book with a bookId
exports.findOne = (req, res) => {
//Get One Book using ID
const book_id = req.params.book_id;
Book.findOne({
        where: {
            book_id: book_id
        }
    },)
    .then(books => res.status(201).json({
        data: books,
        message: 'You Got the Book detail with Id:'+ book_id
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Update a Book identified by the BOOKId in the request
exports.update = (req, res) => {
const book_id = req.params.book_id;
const { book_name, author_id } = req.body;
Book.update({
    book_name: book_name,
    author_id: author_id

}, {
        where: {
            book_id: book_id
        }
    })
    .then(book => res.status(201).json({
        message: 'Book has been updated.'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Delete a Book with the specified bookId in the request
exports.delete = (req, res) => {
const book_id = req.params.book_id;

Book.destroy({
    where: {
        book_id: book_id
    }
})
    .then(status => res.status(201).json({
        message: 'Book has been delete.'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Retrieve and return all Books above User input Params
exports.getage = (req, res) => {
sequelize.query('SELECT * FROM users WHERE age>'+req.params.age, { type: sequelize.QueryTypes.SELECT})
.then(books => {
    res.json({
        data: books,
        message: 'You got the details of All Books'
    })    
})
};