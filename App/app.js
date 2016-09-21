var app = angular.module('MainApp',
    [
        'MainApp.Public','chart.js'
    ]
    );

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/dashboard");

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "/App/Modules/Public/views/home.html",
            controller: 'MainApp.Public.homeCTRL'
        })
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/App/Modules/Public/views/dashboard.html",
            controller: 'MainApp.Public.dashboardCTRL'
        });
});
