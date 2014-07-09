app.factory('listingsService', ['$firebase', function( $firebase ) {

    var ref = new Firebase('https://closetickets.firebaseio.com/listings');
    return $firebase( ref );

}]);