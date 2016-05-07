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

        $scope.launchOffTime = 0;

        $scope.secondCounter = 0;

        // $scope.functionForeverySec = function(){
        //     console.log("everySEC");
        //     $scope.labels.push(++$scope.secondCounter);
        //     $scope.velAccData[0].push("");
        // }

        $scope.setLaunchTime = function(){
            $scope.launchOffTime = moment();
            console.log("in current date! " + $scope.launchOffTime);
            // window.setInterval(function(){
            //     $scope.addData();
            // }, 200);
        }

        //For now, the time is set for when the page originally loads
        $scope.setLaunchTime();
        
        $scope.getTimeSinceLaunch = function(){
            var newNow = moment();
            console.log( "getTimeSinceLaunch " + (newNow.valueOf() - $scope.launchOffTime.valueOf()));
            return (newNow.valueOf()- $scope.launchOffTime.valueOf());
        }



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

        $scope.velAccData = [
            [0]
        ];

        $scope.tempData = [0];

        $scope.labels = [0];

        $scope.series = ['Acceleration'];

        $scope.stopPod = function() {
            //This function will need to handle sending a signal to stop the pod via websockets
            console.log("POD STOPPED");
        }


        $scope.addData = function() {
            //adds dummy data to json object to be graphed
            var len = $scope.velAccData[0].length;
            var rand = Math.random() * 777 % 5;
            if (rand % 2 == 0){
                rand *= -1;
            }
            $scope.num = len + rand;

            // if ($scope.currentPoint >= $scope.labels.length - 1) {
            //     $scope.labels.push($scope.currentPoint);
            // }
            //
            // $scope.velAccData[0].push($scope.num);
            // $scope.currentPoint++;
            //
            // console.log("currentPoint " + $scope.currentPoint);
            // console.log("labels " + $scope.labels);
            // console.log("velAccData " + $scope.velAccData);

            $scope.velAccData[0].push($scope.num);

            $scope.labels.push(Math.round($scope.getTimeSinceLaunch()/1000));


            $scope.makeLabelsSmaller();

            console.log($scope.labels);
        }

        $scope.onClick = function (points, evt) {
            //debugs clicks on graph, might not be needed
            console.log(points, evt);
        };

        $scope.makeLabelsSmaller = function() {
            //hacky fix for when theres lots of labels
            var skip = 5;

            if ($scope.labels.length > 50) {
                skip = 10;
            }
            else if ($scope.labels.length > 100) {
                skip = 15;
            }
            else if ($scope.labels.length > 150) {
                skip = 20;
            }
            else if ($scope.labels.length > 200) {
                skip = 25;
            }
            else if ($scope.labels.length > 250) {
                skip = 30;
            }
            else if ($scope.labels.length > 300) {
                skip = 35;
            }

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
