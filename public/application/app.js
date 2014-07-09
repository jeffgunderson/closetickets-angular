/**
 * Instantiate the angular application
 * @type {module}
 */
var app = angular.module( 'ct', [ 'firebase', 'ngRoute' ] );


/**
 * Router
 * TODO: Probably move to it's own file
 */
app.config( function( $routeProvider, $locationProvider ) {

    // setting so no hash bangs are needed in compatible browsers
    $locationProvider.html5Mode( true );

    // pick a controller and template for each route
    $routeProvider
        .when('/',
        {
            controller: 'ctIndex',
            templateUrl: '/partials/home.html'
        });

});