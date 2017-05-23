let $ = require("jquery"),
	userService = require ("./UserService.js");

class UserCardComponent {
	constructor (user) {
		this._user = user;
	}

	get user () {
		return this._user;
	}

	render () {
		let userEmail = this.user.email ? `<dt>Email:</dt><dd>${this.user.email}</dd>` : `<dt>No eMail provided</dt>`;
		let userPhone = this.user.phone ? `<dt>Phone:</dt><dd>${this.user.phone}</dd>` : `<dt>No phone number provided</dt>`;

		return $(`
			<article>
            <h1>${this.user.name}, ${this.user.lastName}</h1><span class="close-x" id="close-x_${this.user.id}"></span>
            <dl>
            		${userPhone}
            		${userEmail}
            </dl>
        </article>
		`);
	}
}

module.exports = UserCardComponent;
