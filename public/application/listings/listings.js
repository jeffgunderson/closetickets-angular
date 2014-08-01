
/**
 * SERVICES
 */

app.factory('listingsService', ['$firebase','$timeout',
    function( $firebase, $timeout ) {

        var fbRef = new Firebase('https://closetickets.firebaseio.com/listings' );

        var public = {

            listings: function() {
                return $firebase( fbRef ).$asArray();
            },

            activeListing: null

        };

        return public;

    }
]);


/**
 * DIRECTIVES
 */

app.directive('findListing', ['listingsService', function( listingsService ) {
    return {
        restrict: 'E',
        templateUrl: '/application/listings/find-listing.html',
        link: function( $scope ) {

            $scope.listings = listingsService.listings();

            $scope.displayListing = function( listing ) {

                listingsService.activeListing = listing;

            }

        }
    }
}]);

app.directive('listing', [ 'listingsService', 'messagingService' , function( listingsService, messagingService ) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/application/listings/listing.html',
        link: function ( $scope ) {

            $scope.$watch( function() {
                    return listingsService.activeListing
                },
                function(newValue, oldValue) {
                    $scope.activeListing = newValue;
                }
            );

            $scope.closeListing = function() {
                listingsService.activeListing = null;
            }

            $scope.messageUser = function( userId ) {
                listingsService.activeListing = null;
                messagingService.initMessage( userId );
            }

        }
    }
}]);


// TODO: get rid of showSell
app.directive('createListing', [ 'listingsService','authFactory', function( listingsService, authFactory ) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            showSell: '='
        },
        templateUrl: '/application/listings/create-listing.html',
        link: function ( $scope ) {

            $scope.auth = authFactory;

            // Create a listing
            $scope.createListing = function() {

                if ( $scope.auth.user ) {

                    // add some needed user info
                    $scope.listing.userId = $scope.auth.user.id;
                    $scope.listing.userName = $scope.auth.user.displayName;
                    $scope.listing.userImage =  $scope.auth.user.thirdPartyUserData.picture.data.url;

                    listingsService.listings.$add( $scope.listing ).then(function() {
                        $scope.listing = {};
                        $scope.showSell = false;
                    });

                }

            }

            // Cancel listing
            $scope.cancelListing = function() {

                // hide the listing creation popout
                $scope.showSell = false;
                // and clear the listing scope
                $scope.listing = {};

            }

        }
    }
}]);










// TODO: MOVE
app.directive( 'numberOnly' , function() {
    return{
        restrict: 'A',
        link: function( $scope, $element, $attrs ) {

            $element.bind('keyup', function() {
                $element.val( $element.val().replace( /[^0-9.$]/g, '' ) );
            });


        }
    }
});