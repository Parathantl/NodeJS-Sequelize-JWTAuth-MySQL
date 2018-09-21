const bcrypt = require("bcrypt");


module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		first_name: {
			type: Sequelize.STRING
		},
		last_name: {
			type: Sequelize.STRING
		},
		number: {
			type: Sequelize.INTEGER
		},
		email: {
		type: Sequelize.STRING,
			primaryKey: true,
		},
		password: {
			type: Sequelize.STRING
		}
	});

	User.beforeCreate((user, options) => {

		return bcrypt.hash(user.password, 10)
			.then(hash => {
				user.password = hash;
			})
			.catch(err => { 
				throw new Error(); 
			});
	})

	User.prototype.comparePassword = function(pw, callback) {
		let err, pass
		if(!this.password) return false;

		bcrypt.compare(pw, this.password, callback);
	}

	// User.prototype.verifyCredentials = function(loginData, callback) {
		// if(!loginData.username || !loginData.password) return callback('Please provide email and password');	
	// }

	return User;
}