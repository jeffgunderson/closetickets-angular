

app.factory('messagingService', [ '$timeout', '$firebase', 'authFactory',
    function( $timeout, $firebase, authFactory ) {

        var auth = authFactory;
        var messagesRef = new Firebase('https://closetickets.firebaseio.com/messages/');

        var public = {

            activeConversation: null,
            messageModel: [],

            sendMessage: function( message ) {

                if ( auth.user ) {
                    messagesRef.child( message.from ).push( message );
                    messagesRef.child( message.to ).push( message );
                }

            },

            loadMessages: function( userId ) {

                messagesRef.child( auth.user.id )
                    .on('value', function ( snapshot ) {

                        // TODO: create message Model here

                        $timeout(function() {
                            public.messageModel = snapshot.val();
                        });

                    }, function ( error ) {
                        console.log( error.code );
                    }
                );

            },

            initMessage: function( userId ) {

                public.activeConversation = {};
                public.activeConversation.recipientId = userId;
                public.loadMessages( userId );

            }

        };

        return public;

    }
]);


app.directive('messages', ['messagingService', function( messagingService ) {
    return{
        restrict: 'E',
        templateUrl: '/application/messaging/conversations',
        link: function( $scope, element, attrs ) {

        }
    }
}]);


app.directive('conversation', [ 'messagingService', 'authFactory', function( messagingService, authFactory ) {
    return{
        restrict: "E",
        templateUrl: "/application/messaging/conversation.html",
        link: function( $scope, element, attrs ) {

            // attach services to scope
            $scope.messagingService = messagingService;
            $scope.auth = authFactory;

            // TODO: bind messages for this user to messages model

            $scope.sendMessage = function() {

                // TODO: add profile pic and read/unread status
                messagingService.sendMessage( {
                    to: messagingService.activeConversation.recipientId,
                    from: $scope.auth.user.id,
                    profileImage: $scope.auth.user.thirdPartyUserData.picture.data.url,
                    message: $scope.messageText,
                    messageDate: new Date()
                } );

            }

        }
    }
}]);

