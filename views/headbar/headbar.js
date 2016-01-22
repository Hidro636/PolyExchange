Template.headBar.helpers({
    currentUser: function () {
        return Meteor.user().username
    }
});

Template.headBar.events({
    "click #logoutButton": function (e) {
        Meteor.logout();
    },
    "click #usernameLabel": function (e) {
        alert("user info");
    }
});
