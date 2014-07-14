app.controller('User', ['$scope','$timeout','$firebase', 'authFactory',
    function( $scope, $timeout, $firebase, authFactory ) {

        $scope.auth = authFactory;

        $scope.$watch( 'auth.user', function () {

            if ( $scope.auth.user ) {

                $scope.showSignupModal = false;
                $scope.showLoginModal = false;

                var userRef = new Firebase('https://closetickets.firebaseio.com/users/' + $scope.auth.user.id );
                $scope.fbUser = $firebase( userRef );
                $scope.fbUser.$set( $scope.auth.user );
            }

        });

    }
]);