app.controller( 'Listings', [ '$scope', 'listingsService', '$firebase', 'auth', 'geolocation', function( $scope, listingsService, $firebase, auth, geolocation ) {

    $scope.namePlaceholder = 'Name';
    $scope.pricePlaceholder = 'Price';
    $scope.descriptionPlaceholder = 'Description...';

    $scope.$on('geolocationSuccess', function() {

        console.log('geo success');

    });

    $scope.saveListing = function() {

        if ( auth.user != null ) {
            console.log('saving listing');
        }
        else{
            console.log('no can do');
        }

    };

}]);