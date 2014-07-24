
/**
 * SERVICES
 */

app.factory('listingsService', ['$firebase',
    function( $firebase ) {

        var ref = new Firebase('https://closetickets.firebaseio.com/listings' );
        return $firebase( ref );

    }
]);


/**
 * CONTROLLER
 */

app.controller( 'Listings', [ '$scope', 'listingsService', '$firebase', 'geolocation','$timeout','authFactory',
    function( $scope, listingsService, $firebase, geolocation, $timeout, authFactory ) {

        // get the listings and bind them
        $scope.listing = {};
        $scope.listings = listingsService;
        $scope.listings.$bind( $scope, 'listings' );

        // Create a listing
        $scope.createListing = function() {

            if ( $scope.auth.user ) {

                // add some needed user info
                $scope.listing.userId = $scope.auth.userId;
                $scope.listing.userName = $scope.auth.displayName;
                $scope.listing.userImage =  $scope.auth.user.thirdPartyUserData.picture.data.url;

                listingsService.$add( $scope.listing ).then(function() {
                    $scope.listing = {};
                    $scope.showSell = false;
                });

            }

        }

        // Cancel listing
        $scope.cancelListing = function() {

            $scope.showSell = false;

        }

    }
]);


/**
 * DIRECTIVES
 */

app.directive('findListing', function() {
    return {
        restrict: 'E',
        controller: 'Listings',
        templateUrl: '/application/listings/find-listing.html',
        link: function( $scope ) {

        }
    }
});

app.directive('createListing', function() {
    return {
        restrict: 'E',
        controller: 'Listings',
        templateUrl: '/application/listings/create-listing.html',
        link: function ( $scope ) {

        }
    }
});

// TODO: MOVE
app.directive('numberOnly', function( $filter ) {
    return{
        restrict: 'A',
        link: function( $scope, $element, $attrs ) {

            $element.bind('keyup', function() {

                $element.val( $element.val().replace(/[^0-9.$]/g,'') );

                if (  $element.val().substring( 0, 1 ) != '$' ) {

                    $element.val( '$' + $element.val() );

                }

            });


        }
    }
})















//app.directive('createListing', function() {
//    return {
//        restrict: 'E',
//        controller: 'Listings',
//        templateUrl: '/application/listings/create-listing.html',
//        link: function( $scope ) {
//
//            $scope.namePlaceholder = 'Name';
//            $scope.pricePlaceholder = 'Price';
//            $scope.descriptionPlaceholder = 'Description...';
//            $scope.error = null;
//
//            $scope.open = function( $event ) {
//                $event.preventDefault();
//                $event.stopPropagation();
//                $scope.opened = true;
//            };
//
//            $scope.initDate = new Date('2016-15-20');
//            $scope.format = 'MMMM dd, yyyy';
//        }
//    }
//});