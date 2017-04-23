var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope) {
    $scope.todoList = [];

    $scope.addItem = function() {
        var input = $scope.todoInput;
        if (input != "" && input != null){
            $scope.todoList.push({todoText: input, done:false});
            $scope.todoInput = "";
        }
    };

    $scope.removeItems = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, (x) => {
            if (!x.done) $scope.todoList.push(x);
        });
    };

});