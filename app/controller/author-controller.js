const db = require('../models/index.js');

//const Book = db.book;
const Author= db.author; 

exports.create = (req, res) => {
    const {
        author_name
    } = req.body;
    Author.create({
        author_name: author_name,
    })
        .then(data => res.status(201).json({
            message: 'New Author has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));    
};

// Retrieve and return all Authors from the database.
exports.findAll = (req, res) => {
Author.findAll({})
    .then(authors => res.json({
        data: authors,
        message: 'You got the details of All Authors'
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
};


// Find a single Author with a authorId
exports.findOne = (req, res) => {
//Get One Author using ID
const author_id = req.params.author_id;
Author.findOne({
        where: {
            author_id: author_id
        }
    },)
    .then(author => res.status(201).json({
        data: author,
        message: 'You Got the Author detail with Id:'+ author_id
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Update a Author identified by the authorId in the request
exports.update = (req, res) => {
const author_id = req.params.author_id;
const { author_name } = req.body;
Author.update({
    author_name: author_name,

}, {
        where: {
            author_id: author_id
        }
    })
    .then(authors => res.status(201).json({
        message: 'Author has been updated.'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Delete a Author with the specified authorId in the request
exports.delete = (req, res) => {
const author_id = req.params.author_id;

Author.destroy({
    where: {
        author_id: author_id
    }
})
    .then(status => res.status(201).json({
        message: 'Author has been delete.'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Retrieve and return all Authors above User input Params
exports.getage = (req, res) => {
sequelize.query('SELECT * FROM users WHERE age>'+req.params.age, { type: sequelize.QueryTypes.SELECT})
.then(authors => {
    res.json({
        data: authors,
        message: 'You got the details of All authors'
    })    
})
};