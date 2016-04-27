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
        //LATEST STAT VARIABLES
        $scope.latestPosition = 0;
        $scope.latestVelocity = 0;
        $scope.latestAcceleration = 0;
        $scope.latestTemperature = 0;
        $scope.latestPitch = 0;
        $scope.latestYaw = 0;
        $scope.latestRoll = 0;
        $scope.latestTireFL = 0;
        $scope.latestTireFR = 0;
        $scope.latestTireBL = 0;
        $scope.latestTireBR = 0;

        $scope.showGraph = [
            //0:Velocity
            //1:Acceleration
            //2:Temperatures
            true,false,false];

        $scope.currentPoint = 0;

        $scope.velAccData = [];

        $scope.tempData = [0];

        $scope.labels = [1,2,3,4,5];

        $scope.series = ['Acceleration'];

        $scope.stopPod = function() {
            //This function will need to handle sending a signal via websockets
            console.log("POD STOPPED");
        }

        $scope.addData = function() {

            $scope.num = Math.random() * 777 % 100;

            if ($scope.currentPoint >= $scope.labels.length - 1) {
                $scope.labels.push($scope.currentPoint);
            }

            $scope.velAccData.push($scope.num);
            $scope.currentPoint++;

            console.log("currentPoint " + $scope.currentPoint);
            console.log("labels " + $scope.labels);
            console.log("velAccData " + $scope.velAccData);
        }

        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.makeLabelsSmaller = function() {
            var skip = 5;

            for (var i = 0; i < $scope.labels.length; i++) {
                if (i % skip != 0) {
                    $scope.labels[i] = '';
                }
            }
        }

        $scope.chartOptions = {
            //doesn't jump around everytime new data is given
            animation: false,

            scaleOverride: false,
            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: 20,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: 2,
            // Number - The scale starting value
            scaleStartValue: 0,
            // Sets the chart to be responsive
            responsive: true,
            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,
            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",
            //Number - Width of the grid lines
            scaleGridLineWidth : 1,
            //Boolean - Whether the line is curved between points
            bezierCurve : true,
            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,
            //Boolean - Whether to show a dot for each point
            pointDot : false,
            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,
            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,
            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,
            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,
            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,
            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,
            // Function - on animation progress
            onAnimationProgress: function(){},
            // Function - on animation complete
            onAnimationComplete: function(){}
        };

    });
