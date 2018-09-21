module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define('book', {
	  book_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  book_name: {
		  type: Sequelize.STRING
	  }
	});
	
	return Book;
}