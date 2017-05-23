let $ = require("jquery"),
    utils = require('./UtilsService.js'),
    userService = require ("./UserService.js");

class UserFormComponent {

    constructor (event) {
        this._refeshEvent = event;
    }

    validPhone (number) {
        number = number.replaceAll(/[#_\-\(\)]/g,'');
        return (number.length === 7 && number == Math.abs(number) && number == Math.ceil(number));
    }

    validEmail (email) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(email);
    }

    saveUser ({ firstName, lastName, phone, email }) {
        let formData = {};

        let isValid = true;

        if (firstName.val().length === 0) {
            isValid = false;
            firstName.addClass('input-warning').removeClass('input-ok');
        }

        userService.saveUser({
            id: utils.uniqueId(),
            name: firstName.val(),
            lastName: lastName.val(),
            phone: phone.val(),
            email: email.val()
        });

    }

    getInputs () {
        let $inputs = $('#clientForm :input');

        let firstName = $inputs.filter('input#firstName');
        let lastName = $inputs.filter('input#lastName');
        let phone = $inputs.filter('input#phone');
        let email = $inputs.filter('input#email');

        return { firstName, lastName, phone, email };
    }

    clearInputs ({ firstName, lastName, phone, email }) {
        firstName.val('');
        lastName.val('');
        phone.val('');
        email.val('');
    }

    onRefreshList () {
        document.dispatchEvent(this._refeshEvent);
    }

    init () {
        $('#saveButton').on('click', () => {
            let $inputs = $('#clientForm :input');
            this.saveUser(this.getInputs());
            this.clearInputs(this.getInputs());
            this.onRefreshList();
        });
    }

	render () {
  	 return $(`
        <from id="clientForm">
            <article class="input-form">
                <h1>New Client</h1>
                <dl>
                    <dt>First name: <span class="warning"> * </></dt>
                    <dd><input type="text" id="firstName" placeholder="First name" /><div class="hidden warning" >First name is required</div></dd>
                    <dt>Last name:</dt>
                    <dd><input type="text" id="lastName" placeholder="Last name"/></dd>
                    <dt>Phone #:</dt>
                    <dd><input type="text" id="phone" placeholder="Phone number" data-validate="true" /></dd>
                    <dd class="hidden">Phone # seems to be invalid</dd>
                    <dt>Email:</dt>
                    <dd><input type="text" id="email" placeholder="Email address" data-validate="true"/></dd>
                    <dd class="hidden">Email seems to be invalid</dd>
                </dl>
                <button type="submit" id="saveButton" class="button">Save</button>
            </article>
        </form>
      `);
    }
}

module.exports = UserFormComponent;
