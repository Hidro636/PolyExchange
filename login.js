if(Meteor.isClient) {
    Meteor.startup(function() {
        Session.setDefault("showLogin", true);
    });

    Template.loginWindow.helpers({
        showLogin: function() {
            return Session.get("showLogin");
        }
    });

    Template.loginWindow.events({
        "submit #loginForm": function(event, target) {
            event.preventDefault();
        },
        "click #loginTab": function(e, t) {
            e.preventDefault();

            Session.set("showLogin", true);
        },
        "click #createAccountTab": function(e, t){
            e.preventDefault();

            Session.set("showLogin", false);
        }
    });
}