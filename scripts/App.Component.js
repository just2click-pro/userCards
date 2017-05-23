let $ = require("jquery"),
    UserFormComponent = require("./UserForm.component"),
    UsersPageComponent = require("./UsersPage.component");


class AppComponent {
    constructor () {
      this._refeshEvent = document.createEvent("Event");
      this._refeshEvent.initEvent('refresh');
    }

    get refreshEvent () {
        return this._refeshEvent;
    }

    render(){
        //localStorage.clear();
        this.element = $(`<div></div>`);
        let userFormComponent = new UserFormComponent(this.refreshEvent);
        let usersPageComponent = new UsersPageComponent(this.refreshEvent);
        this.element.append( userFormComponent.render() );
        this.element.append( usersPageComponent.render() );

        $(document).on('refresh', () => {
            usersPageComponent.render();
        });

		$(document).ready( () => {
			userFormComponent.init();
            usersPageComponent.render();
		});


        return this.element;
    }
}

function createApp(){
    let app = new AppComponent();
    $(document.body).append( app.render() );
}

module.exports = createApp;
