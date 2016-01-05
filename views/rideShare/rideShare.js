if (Meteor.isClient) {

}


function NewRideObject() {
    return {
        createdBy: '',
        origin: '',
        destination: '',
        seatsAvaliable: 0,
        comments: '',
        departureTime: '',
        departureDate: '',
        requesting: ''
    }
}