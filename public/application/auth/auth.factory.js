app.factory( 'auth', [ '$q', '$rootScope', function( $q, $rootScope ) {

    var auth = {};
    var authUrl = new Firebase('https://closetickets.firebaseio.com');

    auth.broadcastEvent = function( authEvent ) {
        $rootScope.$broadcast( authEvent );
    };

    auth.getUser = function() {
        return auth.user;
    };

    auth.client = new FirebaseSimpleLogin( authUrl, function( error, user ) {

        if ( error ) {
            auth.user = null;
            auth.broadcastEvent( 'loginError' );
        }

        else if ( user ) {
            auth.user = user;
            auth.broadcastEvent( 'userLogin' );
        }

        else {
            auth.user = null;
            auth.broadcastEvent( 'userLogout' );
        }

    });

    auth.login = function() {
        this.client.login('facebook', { rememberMe: true, scope: 'email,user_likes'} );
    };

    auth.logout = function() {
        this.client.logout();
    };

    return auth;

}]);