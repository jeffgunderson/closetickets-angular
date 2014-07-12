app.controller('User', ['$scope','$timeout','$firebase', 'authFactory',
    function( $scope, $timeout, $firebase, authFactory ) {

        $scope.auth = authFactory;

        $scope.$watch( 'auth.user', function (newValue, oldValue) {

            if ( $scope.auth.user ) {

                $scope.showSignupModal = false;
                $scope.showLoginModal = false;

                var userRef = new Firebase('https://closetickets.firebaseio.com/users/' + $scope.auth.user.id );
                $scope.fbUser = $firebase( userRef );
                $scope.fbUser.$bind( $scope, 'auth.user' );
            }

        });
    }
]);

app.directive('signup', function() {

    return {
        restrict: 'E',
        link: function( scope, element, attrs ) {

            element.bind('click', function() {

                scope.signUp();

            });

        }
    }

});

app.directive('login', function() {

    return {
        restrict: 'E',
        link: function( scope, element, attrs ) {

            element.bind('click', function() {

                scope.login();

            });

        }
    }

});