Windows = new Mongo.Collection("Windows");

if(Meteor.isServer){

    Meteor.publish('windowsCollection', function() {
        return Windows.find();
    });

    Meteor.methods({
        insertUserWindowData: function(userId) {
            Windows.insert({
                id: userId,
                rideShareWindow: {
                    visible: true,
                    x: '5%',
                    y: '15%',
                    width: '43%',
                    height: '40%'
                },
                textBookWindow: {
                    visible: true,
                    x: '52%',
                    y: '15%',
                    width: '43%',
                    height: '40%'
                },
                marketPlaceWindow: {
                    visible: true,
                    x: '5%',
                    y: '60%',
                    width: '90%',
                    height: '30%'
                }
            });

            console.log('Inserted data for user: ' + userId);
        }
    });
}