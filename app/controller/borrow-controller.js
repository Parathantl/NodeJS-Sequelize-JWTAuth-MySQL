const db = require('../models/index.js');
const Borrow = db.borrow;

//const Author= db.author; 
//const User = db.user;

exports.create = (req, res) => {
    const {
        issue_date,
        due_date,
        user_id,
        book_id
    } = req.body;
    Borrow.create({
        issue_date: issue_date,
        due_date: due_date,
        user_id:user_id,
        book_id:book_id
    })
        .then(data => res.status(201).json({
            message: 'New Borrow has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));    
};

// Retrieve and return all Borrow from the database.
exports.findAll = (req, res) => {
Borrow.findAll({})
    .then(borrow => res.json({
        data: borrow,
        message: 'You got the details of All Borrowings'
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
};


// Find a single Borrow with a borrowkId
exports.findOne = (req, res) => {
//Get One Borrow using ID
const borrow_id = req.params.borrow_id;
Borrow.findOne({
        where: {
            borrow_id: borrow_id
        }
    },)
    .then(borrow => res.status(201).json({
        data: borrow,
        message: 'You Got the Borrow detail with Id:'+ borrow_id
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Update a Borrow identified by the BOrrowId in the request
exports.update = (req, res) => {
const borrow_id = req.params.borrow_id;
const { 
    issue_date,
    due_date,
    user_id,
    book_id } = req.body;
Borrow.update({
    issue_date: issue_date,
    due_date:due_date,
    user_id:user_id,
    book_id:book_id
}, {
        where: {
            borrow_id: borrow_id
        }
    })
    .then(borrow => res.status(201).json({
        message: 'Borrow has been updated.'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Delete a borrow with the specified borrowId in the request
exports.delete = (req, res) => {
const borrow_id = req.params.borrow_id;

Borrow.destroy({
    where: {
        borrow_id: borrow_id
    }
})
    .then(status => res.status(201).json({
        message: 'Borrow has been delete.'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Retrieve and return all Borrows above User input Params
exports.getage = (req, res) => {
sequelize.query('SELECT * FROM users WHERE age>'+req.params.age, { type: sequelize.QueryTypes.SELECT})
.then(books => {
    res.json({
        data: books,
        message: 'You got the details of All Books'
    })    
})
};