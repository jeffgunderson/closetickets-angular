app.controller( 'Listings', [ '$scope', 'listingsService', '$firebase', 'geolocation','$timeout','authFactory',
    function( $scope, listingsService, $firebase, geolocation, $timeout, authFactory ) {

        $scope.auth = authFactory;

        $scope.saveListing = function() {

            if ( $scope.auth.user ) {
                console.log('saving listing');
            }
            else{
                console.log('no can do');
            }

        };

    }
]);

app.factory('listingsService', ['$firebase',
    function( $firebase ) {

        var ref = new Firebase('https://closetickets.firebaseio.com/listings');
        return $firebase( ref );

    }
]);

app.directive('createListing', function( authFactory ) {
    return {
        restrict: 'E',
        controller: 'Listings',
        templateUrl: '/application/listings/create-listing.html',
        link: function( $scope ) {

            $scope.namePlaceholder = 'Name';
            $scope.pricePlaceholder = 'Price';
            $scope.descriptionPlaceholder = 'Description...';
            $scope.error = null;

        }
    }
});

app.directive('listingDisplay', function( authFactory ) {
    return {
        restrict: 'E',
        controller: 'Listings',
        templateUrl: '/application/listings/listing-display.html',
        link: function ($scope, element) {



        }
    }
});