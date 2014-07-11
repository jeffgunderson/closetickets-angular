app.directive('createListing', function() {
    return {
        restrict: 'E',
        controller: 'Listings',
        templateUrl: '/application/listings/create-listing.html'
    }
});

app.directive('listingDisplay', function( authFactory ) {
    return {
        restrict: 'E',
        controller: 'Listings',
        templateUrl: '/application/listings/listing-display.html',
        link: function ($scope, element) {

            $scope.auth = authFactory;

            $scope.namePlaceholder = 'Name';
            $scope.pricePlaceholder = 'Price';
            $scope.descriptionPlaceholder = 'Description...';
            $scope.error = null;

            $scope.$on('geolocationSuccess', function() {
                console.log('geo success');
            });

            $scope.saveListing = function() {

                if ( $scope.auth.user ) {
                    console.log('saving listing');
                }
                else{
                    console.log('no can do');
                }

            };

        }
    }
});