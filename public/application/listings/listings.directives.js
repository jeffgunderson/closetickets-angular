app.directive('createListing', function() {
    return {
        restrict: 'E',
        controller: 'Listings',
        templateUrl: '/application/listings/create-listing.html'
    }
});