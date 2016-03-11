angular.module('MainApp.Public')

    .controller('MainApp.Public.homeCTRL',
    function ($scope, $http, socketService) {

        $scope.sendText = function() {
            var textInterval = setInterval(function() {
                socketService.sendText();
            }, 1);

            setTimeout(function() {
                clearInterval(textInterval);
            }, 10000);

            //socketService.sendText();

        };

        $scope.sendBinary = function() {
            socketService.sendBinary();
        }
    })

    .controller('MainApp.Public.shellCTRL',
    function ($scope, $http) {

    })

    .controller('MainApp.Public.guiCTRL',
    function ($scope, $http) {

    });



