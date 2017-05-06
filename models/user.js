const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice');

const User = db.define('user', {
	first: {
		type: Sequelize.STRING
	},
	last: {
		type: Sequelize.STRING
	},
	age: {
		type: Sequelize.INTEGER,
		validate: {
			min: 18
		}
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	bio: {
		type: Sequelize.TEXT
	}
}, {
	getterMethods: {
		fullName: function() {
			return this.first + " " + this.last;
		}
	},
	instanceMethods: {
		haveBirthday: function() {
			return this.update({
				first: this.first,
				last: this.last,
				age : this.age + 1,
				email: this.email,
				bio: this.bio
			});
		}
	}
});

module.exports = User;
