if (Meteor.isClient) {


    // Body ############################################################################################################
    Template.body.onCreated(function () {
        this.subscribe("Windows");
    });

    Template.body.helpers({
        window1Visible: function () {
            if (Template.instance().subscriptionsReady()) {
                var visible = Windows.find().fetch()[0].window1.visible;
                return visible;
            }
        }
    });
    // #################################################################################################################

    Template.rideShareDragBox.onRendered(function () {
        var window1 = Windows.find().fetch()[0].window1;
        this.$("#window1").css({
            "height": window1.height,
            "width": window1.width,
            "left": window1.left,
            "top": window1.top
        });
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

    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;


}

