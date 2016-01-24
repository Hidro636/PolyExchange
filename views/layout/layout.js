if (Meteor.isClient) {

    Meteor.startup(function () {
        Session.set("subscriptionsReady", false);
    });

    Meteor.subscribe("Windows", function () {
        Session.set("subscriptionsReady", true);
    });


    // Body ############################################################################################################

    Template.body.helpers({
        ready: function () {
            return Session.get('subscriptionsReady');
        },
        window1Visible: function () {
            return Windows.find().fetch()[0].window1.visible;
        }
    });

    // #################################################################################################################

    // onRendered ############################################################################################################
    Template.rideShareDragBox.onRendered(function () {
        var window = Windows.find().fetch()[0].window1;
        console.log(window);
        this.$("#window1").css({
            "height": window.height,
            "width": window.width,
            "left": window.left,
            "top": window.top
        });
    });

    Template.textBookDragBox.onRendered(function () {
        var window = Windows.find().fetch()[0].window2;
        this.$("#window2").css({
            "height": window.height,
            "width": window.width,
            "left": window.left,
            "top": window.top
        });
    });

    Template.marketPlaceDragBox.onRendered(function () {
        var window = Windows.find().fetch()[0].window3;
        this.$("#window3").css({
            "height": window.height,
            "width": window.width,
            "left": window.left,
            "top": window.top
        });
    });
    // #################################################################################################################


    Template.rideShareDragBox.events({
        /*"click #closeButton": function () {
            Meteor.call("setWindowVisible",Meteor.userId(), "window1", false);
        }*/
    });

    Template.textBookDragBox.events({

    });

    Template.marketPlaceDragBox.events({

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
        console.log("(" + Math.round(x, 1) + ", " + Math.round(y, 1) + ")");
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;


}

