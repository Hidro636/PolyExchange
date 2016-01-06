if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.setDefault("showLogin", true);
        Session.setDefault("test", false);
        Session.setDefault("error", false);
    });



    Template.loginWindow.helpers({
        showLogin: function () {
            return Session.get("showLogin");
        },
        error: function () {
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

            if (email == '') e.target.emailTextBox.style.borderColor = "red";
            else e.target.emailTextBox.style.borderColor = "rgba(147, 196, 125, 1)";

            if (password == '') e.target.passwordTextBox.style.borderColor = "red";
            else e.target.passwordTextBox.style.borderColor = "rgba(147, 196, 125, 1)";

            if (email != '' && password != '') {
                Meteor.loginWithPassword(email, password, function (error) {
                    if (error) {
                        e.target.emailTextBox.style.borderColor = "red";
                        e.target.passwordTextBox.style.borderColor = "red";
                        $("#loginButton").removeClass('hvr-hang');
                        $("#loginButton").addClass('animated shake');

                        setTimeout(function () {
                            $("#loginButton").addClass('hvr-hang');
                        }, 500);
                    }
                });
            }
        },
        "keyup #emailTextBox": function(e) {
            if(e.target.value.includes("@") && !e.target.value.includes("calpoly.edu")) {
                e.target.value = e.target.value + "calpoly.edu";
            }
        }
    });

    Template.createAccountForm.events({
        "submit #createAccountForm": function (e) {
            e.preventDefault();

            var canCreateAccount = true;

            var email = e.target.emailTextBox.value;
            var password = e.target.passwordTextBox.value;
            var confirmPassword = e.target.confirmPasswordTextBox.value;

            if (email == '' || !email.includes("@") || email.split('@')[1].toLowerCase() != 'calpoly.edu') {
                e.target.emailTextBox.style.borderColor = "red";
                canCreateAccount = false;
            }
            else e.target.emailTextBox.style.borderColor = "rgba(147, 196, 125, 1)";

            if (password == '') {
                e.target.passwordTextBox.style.borderColor = "red";
            }
            else e.target.passwordTextBox.style.borderColor = "rgba(147, 196, 125, 1)";

            if (confirmPassword == '') {
                e.target.confirmPasswordTextBox.style.borderColor = "red";
            }
            else e.target.confirmPasswordTextBox.style.borderColor = "rgba(147, 196, 125, 1)";

            if (password != confirmPassword) {
                canCreateAccount = false;

                e.target.passwordTextBox.style.borderColor = "red";
                e.target.confirmPasswordTextBox.style.borderColor = "red";

                $("#passwordTextBox").addClass("animated shake");
                $("#confirmPasswordTextBox").addClass("animated shake");

            }

            if(canCreateAccount) {
                Accounts.createUser({
                    username: email.split('@')[0],
                    password: password,
                    email: email
                }, function() {
                    Session.set("showLogin", true);

                    Meteor.call('insertUserWindowData', Meteor.userId());
                    Meteor.logout();
                    Meteor.loginWithPassword(email.split('@')[0], password);
                });

            }
        },
        "keyup #emailTextBox": function(e) {
            if(e.target.value.includes("@") && !e.target.value.includes("calpoly.edu")) {
                e.target.value = e.target.value + "calpoly.edu";
            }
        }
    });
}