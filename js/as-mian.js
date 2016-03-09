/**
 * Created by Administrator on 2016/3/2 0002.
 */
var app = angular.module('myApp',[]);
app.run(function($rootScope) {
    $rootScope.name = "Air Lerner";
});

app.controller('PlayerController', ['$scope', function($scope) {
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = 'src/test.mp3';
    $scope.play = function() {
        $scope.audio.play(); // HTML5中自带的方法
        $scope.playing = true;
    };
    $scope.stop = function() {
        $scope.audio.pause();
        $scope.playing = false;
    };
    $scope.audio.addEventListener('ended', function() {
        $scope.$apply(function() {
            $scope.stop()
        });
    });
}]);

app.controller('RelatedController', ['$scope', function($scope) {
}]);

//--------------Learn--------------------
app.controller('MyController', function($scope) {
   $scope.person = {
     name: "Air Lerner1"
   };
    var updateClock = function() {
        $scope.clock = new Date();
    };
    var timer = setInterval(function() {
        $scope.$apply(updateClock);
    },1000);
    updateClock();
});

app.controller('ParentController', function($scope) {
    $scope.person = {
        greeted: false
    };
});

app.controller('ChildController', function($scope) {
    $scope.sayHello = function() {
        $scope.person.greeted = true;
    }
});
app.controller('DemoController', function($scope) {
    $scope.counter = 0;
    $scope.add = function(amount) { $scope.counter += amount; };
    $scope.subtract = function(amount) { $scope.counter -= amount; };
});