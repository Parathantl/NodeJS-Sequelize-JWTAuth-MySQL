module.exports = (sequelize, Sequelize) => {
	const Borrow = sequelize.define('borrow', {
		borrow_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		issue_date: {
			type: Sequelize.DATEONLY
		},
		due_date: {
			type: Sequelize.DATEONLY
		}
	});

	return Borrow;
}