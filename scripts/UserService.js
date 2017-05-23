class UserService {
	saveUser (user) {
		if (this.getUser(user.id)) {
			localStorage.removeItem('user_' + user.id);
		}
		localStorage.setItem('user_' + user.id, JSON.stringify(user));
	}

	getAllUsers () {
		let allUsers = [];
		let keys = Object.keys(localStorage),
			i = keys.length;

		while (i--) {
			if (keys[i].indexOf('user_') === 0) {
				allUsers.push(JSON.parse(localStorage.getItem(keys[i])));
			}
		}

		return allUsers;
	}

	getUser (id) {
		return localStorage.getItem('user_' + id);
	}

	removeUser (id) {
		localStorage.removeItem('user_' + id);
	}
}

module.exports = new UserService();
