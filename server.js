Windows = new Mongo.Collection("Windows");

if (Meteor.isServer) {

    Meteor.publish('Windows', function () {
        return Windows.find({id: this.userId});
    });

    Meteor.methods({
        insertWindowData: function(userId) {
            Windows.insert({
                id: userId,
                window1: {
                    width: "100px",
                    height: "100px",
                    left: "100px",
                    top: "100px",
                    visible: true
                },
                window2: {
                    width: "100px",
                    height: "100px",
                    left: "100px",
                    top: "210px",
                    visible: true
                },
                window3: {
                    width: "100px",
                    height: "100px",
                    left: "100px",
                    top: "320px",
                    visible: true
                }
            });
        }
    });
}