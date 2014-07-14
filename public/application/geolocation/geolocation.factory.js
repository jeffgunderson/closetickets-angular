app.factory('geolocation', [ '$rootScope', '$q', function( $rootScope, $q ) {

    var location = {};

    location.getLocation = function() {

        if ( navigator.geolocation ) {

            navigator.geolocation.getCurrentPosition( function( coords ) {

                location.coordinates = coords;

            });

        }

        else{

            // TODO: another solution
            location.coordinates = null;

        }

    };

    location.getLocation();

    return location;

}]);