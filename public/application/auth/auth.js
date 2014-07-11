app.factory( 'authFactory', [ '$timeout',
    function( $timeout ) {

        var pub = {

            login: function() {
                fbAuth.login('facebook', { rememberMe: true, scope: 'email,user_likes'} );
            },

            logout: function() {
                fbAuth.logout();
            },

            user: null
        };

        var authUrl = new Firebase('https://closetickets.firebaseio.com');

        var fbAuth = new FirebaseSimpleLogin( authUrl, function( error, user ) {

            if ( error ){
                $timeout(function() {
                    pub.user = null;
                });

            }

            else if ( user ){
                $timeout(function() {
                    pub.user = angular.copy( user );
                });
            }

            else{
                $timeout(function() {
                    pub.user = null;
                });

            }

        });

        return pub;
    }
]);