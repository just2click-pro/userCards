let $ = require("jquery"),
	UserCardComponent = require("./UserCard.component.js"),
	userService = require ("./UserService.js");

class UsersPageComponent {

	constructor (event) {
	  this._refeshEvent = event;
	  this._users = userService.getAllUsers();
	}

	onRefreshList () {
		document.dispatchEvent(this._refeshEvent);
	}

 	getAllUsers () {
		this._users = userService.getAllUsers();
		let usersDOM = $('#users');

		if (usersDOM.length === 1) {
			usersDOM.empty();
		}

		for (let user of this._users) {
			let userCard = new UserCardComponent(user);
			usersDOM.append(userCard.render());
			$('#close-x_' + userCard.user.id).click(() => {
				userService.removeUser(userCard.user.id);
				this.onRefreshList();
			});
		}

		if (this._users.length === 0) {
			usersDOM.append(`<div>No clients in the system yet!</div>`);
		}
	}

	render () {
		this.element = $(`
			<main>
				<h1>Clients List</h1>
				<section id="users"></section>
      </main>
    `);
    this.getAllUsers();
    return this.element;
	}
}

module.exports = UsersPageComponent;
