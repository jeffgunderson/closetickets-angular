app.directive( 'datePicker', function() {
    return {
        restrict: "A",
        link: function( $scope, $element, $attr ) {

            // init the date picker
            $element.pickadate({
                format: 'mmmm d, yyyy'
            });

        }
    }
});

app.directive( 'timePicker', function() {
    return {
        restrict: "A",
        link: function( $scope, $element, $attr ) {

            // init the date picker
            $element.pickatime();

        }
    }
});