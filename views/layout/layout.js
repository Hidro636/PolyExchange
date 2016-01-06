if (Meteor.isClient) {

    Template.rideShareDragBox.onRendered(function () {

            setTimeout(function () {
                var window = Windows.findOne({id: Meteor.userId()}).rideShareWindow;

                this.$('#rideShareWindow').css({
                    'left': window.x,
                    'top': window.y,
                    'height': window.height,
                    'width': window.width
                });
            }, 100);
        }
    );

    Template.textBookDragBox.onRendered(function () {

            setTimeout(function () {
                var window = Windows.findOne({id: Meteor.userId()}).textBookWindow;

                this.$('#textBookWindow').css({
                    'left': window.x,
                    'top': window.y,
                    'height': window.height,
                    'width': window.width
                });
            }, 100);
        }
    );

    Template.marketPlaceDragBox.onRendered(function () {

            setTimeout(function () {
                var window = Windows.findOne({id: Meteor.userId()}).marketPlaceWindow;

                this.$('#marketPlaceWindow').css({
                    'left': window.x,
                    'top': window.y,
                    'height': window.height,
                    'width': window.width
                });


            }, 100);
        }
    );


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


    interact('.draggable')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent

            // enable autoScroll
            autoScroll: false,

            // call this function on every dragmove event
            onmove: dragMoveListener
        }).resizable({
            preserveAspectRatio: true,
            edges: {left: true, right: true, bottom: true, top: true}
        })
        .on('resizemove', function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

            Meteor.call('updateUserWindowSize', Meteor.userId(), target.id, event.rect.height + 'px', event.rect.width + 'px');
            Meteor.call('updateUserWindowPosition', Meteor.userId(), target.id, target.getAttribute('data-x'), target.getAttribute('data-y'));
            //console.log('(' + x + ',  ' + y + ')');
            console.log(target.id);
            //console.log('resized to h: ' + event.rect.height + ' w: ' + event.rect.width);
            //Display size on rectangle
            //target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
        });

    function dragMoveListener(event) {

        var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        //console.log("(" + x + ", " + y + ")");
        // translate the element
        target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        Meteor.call('updateUserWindowPosition', Meteor.userId(), event.target.id, target.getAttribute('data-x'), target.getAttribute('data-y'));
        console.log(target.id);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;


}

