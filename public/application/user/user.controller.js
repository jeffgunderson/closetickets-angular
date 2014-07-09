app.controller('User', ['$scope','$timeout','$firebase', 'auth', function( $scope, $timeout, $firebase, auth ) {

    $scope.loggedIn = false;

    $scope.$on( 'userLogin', function() {

        $scope.showSignupModal = false;
        $scope.showLoginModal = false;
        $scope.loggedIn = true;

        $scope.user = auth.user;
        $scope.user.profileImage = 'https://graph.facebook.com/' + auth.user.id + '/picture'; // can use third party data here in object instead.. "auth.user.thirdPartyUserData.picture.data.url"

        var userRef = new Firebase('https://closetickets.firebaseio.com/users/' + auth.user.id );
        $scope.fbUser = $firebase( userRef );
        $scope.fbUser.$bind( $scope, 'user' );

    });

    $scope.$on( 'userLogout', function() {

        $timeout(function() {
            $scope.loggedIn = false;
        });


    });

    $scope.signUp = function() {

        auth.login();

    };

    $scope.login = function() {

        auth.login();

    };

    $scope.logout = function() {

        auth.logout();

    }

}]);