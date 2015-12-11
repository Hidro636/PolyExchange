if(Meteor.isClient) {
    Template.headBar.events({
       "click #logoutButton": function(e) {
           Meteor.logout();
       }
    });
}