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

    .controller('MainApp.Public.dashboardCTRL',
    function ($scope, $http) {
        $scope.chartOptions = {animation: false};
        $scope.currentPoint = 0

        $scope.data = [
            [0],
            [0]
        ];

        $scope.stopPod = function() {
            //This function will need to handle sending a signal via websockets
            console.log("POD STOPPED");
        }

        $scope.addData = function() {
            $scope.num = Math.random() * 777 % 100;
            if ($scope.currentPoint >= $scope.labels.length - 1) {
                $scope.lastLabel = $scope.labels[$scope.labels.length - 1];
                $scope.labels.push(++$scope.lastLabel);
            }
            $scope.data[0].push($scope.num);
            $scope.currentPoint++;
        }
        
        $scope.labels = [0,1,2,3,4,5];
        $scope.series = ['Acceleration', 'Velocity'];

        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

    });
