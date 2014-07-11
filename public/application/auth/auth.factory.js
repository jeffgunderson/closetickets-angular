app.factory( 'authFactory', [
    function() {

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
            if ( error )
                pub.user = null;
            else if ( user )
                pub.user = angular.copy( user );
            else
                pub.user = null;
        });

        return pub;
    }
]);