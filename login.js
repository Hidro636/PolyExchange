if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.setDefault("showLogin", true);
        Session.setDefault("test", false);
        Session.setDefault("error", false);
    });

    Template.body.helpers({
        test: function () {
            return Session.get('test');
        }
    });

    Template.loginWindow.helpers({
        showLogin: function () {
            return Session.get("showLogin");
        },
        error: function(){
            return Session.get('error');
        }
    });

    Template.loginWindow.events({
        "click #loginTab": function (e) {
            e.preventDefault();

            Session.set("showLogin", true);
        },
        "click #createAccountTab": function (e) {
            e.preventDefault();
            Session.set('error', false);
            Session.set("showLogin", false);
        }
    });

    Template.loginForm.events({
        "submit #loginForm": function (e) {
            e.preventDefault();
            var email = e.target.emailTextBox.value;
            var password = e.target.passwordTextBox.value;

            if(email == '' || password == ''){
                $('#errorLabel').text("A field was left blank!");
            }

        }
    });
}