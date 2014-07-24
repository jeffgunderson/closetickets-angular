app.controller('ctIndex', ['$scope','authFactory', function( $scope, authFactory ) {

    // init auth
    $scope.auth = authFactory;

}]);

