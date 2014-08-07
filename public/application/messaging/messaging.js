

app.factory( 'messagingService', [ '$timeout', '$firebase', 'authFactory',
    function( $timeout, $firebase, authFactory ) {

        var auth = authFactory;
        var messagesRef = new Firebase('https://closetickets.firebaseio.com/messages/');

        var pub = {

            // TODO: get rid of message model and change loadMessages to messages
            activeConversation: null,
            messageModel: [],

            sendMessage: function( message ) {

                if ( auth.user ) {
                    messagesRef.child( message.from ).push( message );
                    messagesRef.child( message.to ).push( message );
                }

            },

            loadMessages: function() {
                pub.messageModel = $firebase( messagesRef.child( auth.user.id ) ).$asArray();
            },

            initMessage: function( userId ) {

                pub.activeConversation = {};
                pub.activeConversation.recipientId = userId;
                pub.loadMessages();

            }

        };

        return pub;

    }
]);


app.directive( 'messages', [ 'messagingService', 'authFactory', 'modalService', function( messagingService, authFactory, modalService ) {
    return{
        restrict: 'E',
        templateUrl: '/application/messaging/conversations.html',
        scope: {
            showMessaging: '='
        },
        link: function( $scope, element, attrs ) {

            // attach services to scope
            $scope.messagingService = messagingService;
            $scope.auth = authFactory;
            $scope.modal = modalService;

            $scope.openConversation = function( userId ) {

                messagingService.initMessage( userId );
                $scope.modal.showMessage();

            };

        }
    }
}]);


app.directive( 'conversation', [ 'messagingService', 'authFactory', 'modalService', function( messagingService, authFactory, modalService ) {
    return{
        restrict: "E",
        templateUrl: "/application/messaging/conversation.html",
        link: function( $scope, element, attrs ) {

            // attach services to scope
            $scope.messagingService = messagingService;
            $scope.auth = authFactory;
            $scope.modal = modalService;

            $scope.sendMessage = function() {

                // TODO: add profile pic and read/unread status
                messagingService.sendMessage( {
                    to: messagingService.activeConversation.recipientId,
                    from: $scope.auth.user.id,
                    displayName: $scope.auth.user.displayName,
                    profileImage: $scope.auth.user.thirdPartyUserData.picture.data.url,
                    message: $scope.messageText,
                    messageDate: new Date()
                } );

                // clear the message
                $scope.messageText = '';

            }

            $scope.closeMessage = function() {

                messagingService.activeConversation = null;
                $scope.modal.hideModals();
                $scope.modal.showConversations();

            }

        }
    }
}]);



app.filter( 'filterMessagesByUser', function () {
    return function ( messages, userId ) {

        var filteredMessages = [];

        for ( var i = 0; i < messages.length; i++ ) {

            if ( messages[i].to == userId || messages[i].from == userId ) {
                filteredMessages.push( messages[i] );
            }

        }

        return filteredMessages;
    };
});



app.filter('messageList', function() {
    return function( messages, userId ) {

        var userIndex = {};
        var messageList = [];

        for ( var i = 0; i < messages.length; i++ ) {

            var message = messages[i];

            if ( message.from != userId && !userIndex[message.from] ) {

                userIndex[ message.from ] = true;
                messageList.push( message );

            }

        }

        return messageList;

    }
})
