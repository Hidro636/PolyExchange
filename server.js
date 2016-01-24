Windows = new Mongo.Collection("Windows");

if (Meteor.isServer) {

    Meteor.publish('Windows', function () {
        return Windows.find({id: this.userId});
    });

    Meteor.methods({
        insertWindowData: function (userId) {
            Windows.insert({
                id: userId,
                window1: {
                    width: "44%",
                    height: "50%",
                    left: "5%",
                    top: "12%",
                    visible: true
                },
                window2: {
                    width: "44%",
                    height: "50%",
                    left: "51%",
                    top: "12%",
                    visible: true
                },
                window3: {
                    width: "90%",
                    height: "28%",
                    left: "5%",
                    top: "66%",
                    visible: true
                }
            });
        },
        updateWindowSizeAndPosition: function (userId, window, x, y, height, width) {
            if (window == "window1") {
                Windows.update({id: userId}, {
                    "$set": {
                        "window1.height": height,
                        "window1.width": width,
                        "window1.top": y,
                        "window1.left": x
                    }
                });
            } else if (window == "window2") {
                Windows.update({id: userId}, {
                    "$set": {
                        "window2.height": height,
                        "window2.width": width,
                        "window2.top": y,
                        "window2.left": x
                    }
                });
            } else if (window == "window3") {
                Windows.update({id: userId}, {
                    "$set": {
                        "window3.height": height,
                        "window3.width": width,
                        "window3.top": y,
                        "window3.left": x
                    }
                });
            }
        },
        setWindowVisible: function (userId, window, visible) {
            if (window == "window1") {
                Windows.update({id: userId}, {
                    "$set": {
                        "window1.visible": visible
                    }
                });
            } else if (window == "window2") {
                Windows.update({id: userId}, {
                    "$set": {
                        "window2.visible": visible
                    }
                });
            } else if (window == "window3") {
                Windows.update({id: userId}, {
                    "$set": {
                        "window3.visible": visible
                    }
                });
            }
        }
    });
}