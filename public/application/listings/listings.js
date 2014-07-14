/**
 * CONTROLLER
 */

app.controller( 'Listings', [ '$scope', 'listingsService', '$firebase', 'geolocation','$timeout','authFactory','listingsService',
    function( $scope, listingsService, $firebase, geolocation, $timeout, authFactory, listingsService ) {

        $scope.auth = authFactory;

        $scope.listing = {};

        $scope.saveListing = function() {

            if ( $scope.auth.user ) {

                // add some needed user info
                $scope.listing.userId = $scope.auth.userId;
                $scope.listing.userName = $scope.auth.displayName;
                $scope.listing.userImage =  $scope.auth.user.thirdPartyUserData.picture.data.url;

                listingsService.$add( $scope.listing );
            }
            else{
                console.log('no can do');
            }

        };

        $scope.listings = listingsService;
        $scope.listings.$bind( $scope, 'listings' );

    }
]);

/**
 * SERVICES
 */

app.factory('listingsService', ['$firebase',
    function( $firebase ) {

        var ref = new Firebase('https://closetickets.firebaseio.com/listings');
        return $firebase( ref );

    }
]);


/**
 * DIRECTIVES
 */

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

app.directive('findListing', function() {
    return {
        restrict: 'E',
        controller: 'Listings',
        templateUrl: '/application/listings/find-listing.html',
        link: function( $scope ) {

        }
    }
});

app.directive('listingDisplay', function() {
    return {
        restrict: 'E',
        controller: 'Listings',
        templateUrl: '/application/listings/listing-display.html',
        link: function ( $scope ) {

        }
    }
});