module.exports = (sequelize, Sequelize) => {
	const Author = sequelize.define('author', {
		author_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		author_name: {
			type: Sequelize.STRING
		}
	});

	return Author;
}