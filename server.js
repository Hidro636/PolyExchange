Windows = new Mongo.Collection("Windows");

if(Meteor.isServer){

    Meteor.publish('Windows', function() {
        return Windows.find();
    });

    Meteor.methods({
        insertUserWindowData: function(userId) {
            Windows.insert({
                id: userId,
                rideShareWindow: {
                    visible: true,
                    x: '5%',
                    y: 100,
                    width: '600px',
                    height: '400px'
                },
                textBookWindow: {

                },
                marketPlaceWindow: {

                }
            });

            console.log('Inserted data for user: ' + userId);
        }
    });
}