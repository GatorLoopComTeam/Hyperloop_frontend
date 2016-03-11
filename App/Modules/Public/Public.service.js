/**
 * Created by Gavin on 2/25/16.
 */

var app = angular.module('MainApp.Public');
var baseUrl = '/Services/';

app.factory('speedService', function($http) {

    return {
        saveSpeed: function(currentSpeed) {
            return $http.get(baseUrl + 'saveSpeed.php?currentSpeed=' + currentSpeed);
        }
    };

});
