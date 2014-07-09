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