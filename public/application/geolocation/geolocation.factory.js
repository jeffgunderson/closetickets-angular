app.factory('geolocation', [ '$rootScope', '$q', function( $rootScope, $q ) {

    var location = {};

    location.getLocation = function() {

        if ( navigator.geolocation ) {

            navigator.geolocation.getCurrentPosition( function( location ) {

                $rootScope.geolocation = location;
                $rootScope.$broadcast('geolocationSuccess');
                console.log( location );

            });

        }

        else{

            $rootScope.geolocation = null;
            $rootScope.$broadcast('geolocationError');

        }

    };

    location.getLocation();

    return location;

}]);