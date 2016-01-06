Windows = new Mongo.Collection("Windows");

if (Meteor.isServer) {

    Meteor.publish('windowsCollection', function () {
        return Windows.find();
    });

    Meteor.methods({
        insertUserWindowData: function (userId) {
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
        },
        updateUserWindowSize: function (userId, window, h, w) {
            //console.log('Updating window size (' + window + )
            switch (window) {
                case 'rideShareWindow':
                    Windows.update({id: userId}, {
                        $set: {
                            'rideShareWindow.height': h,
                            'rideShareWindow.width': w
                        }
                    });
                    break;

                case 'textBookWindow':
                    Windows.update({id: userId}, {
                        $set: {
                            'textBookWindow.height': h,
                            'textBookWindow.width': w
                        }
                    });
                    break;

                case 'marketPlaceWindow':
                    Windows.update({id: userId}, {
                        $set: {
                            'marketPlaceWindow.height': h,
                            'marketPlaceWindow.width': w
                        }
                    });
                    break;
            }
        },
        updateUserWindowPosition: function (userId, window, x, y) {
            console.log('updating position: ' + x + ',' + y);
            switch (window) {
                case 'rideShareWindow':
                    Windows.update({id: userId}, {
                        $set: {
                            'rideShareWindow.x': x + 'px',
                            'rideShareWindow.y': y + 'px'
                        }
                    });
                    break;

                case 'textBookWindow':
                    Windows.update({id: userId}, {
                        $set: {
                            'textBookWindow.x': x + 'px',
                            'textBookWindow.y': y + 'px'
                        }
                    });
                    break;

                case 'marketPlaceWindow':
                    Windows.update({id: userId}, {
                        $set: {
                            'marketPlaceWindow.x': x + 'px',
                            'marketPlaceWindow.y': y + 'px'
                        }
                    });
                    break;
            }
        },
        updateUserWindowVisibility: function (userId, window, visible) {

        }
    });
}