app.factory('modalService', [ '$timeout', function( $timeout ) {

    // TODO: maybe just one function but don't like idea of passing in string and validating

    var pub = {

        modalShown: null,

        showMessage: function() {
            pub.modalShown = 'message'
        },

        showConversations: function() {
            pub.modalShown = 'conversations'
        },

        showListing: function() {
            pub.modalShown = 'listing'
        },

        showCreateListing: function() {
            pub.modalShown = 'createListing'
        },

        hideModals: function() {
            pub.modalShown = null;
        }



    }

    return pub;

}]);