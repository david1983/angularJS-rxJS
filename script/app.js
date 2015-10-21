"use strict";

var app = angular.module('myapp',[]);

app.controller('myctrl', function($scope, moviesdb){
    var scope = $scope;


    Rx.Observable.$watch = function (scope, watchExpression, objectEquality) {
        return Rx.Observable.create(function (observer) {
            // Create function to handle old and new Value
            function listener (newValue, oldValue) {
                observer.onNext({ oldValue: oldValue, newValue: newValue });
            }

            // Returns function which disconnects the $watch expression
            return scope.$watch(watchExpression, listener, objectEquality);
        });
    };

    Rx.Observable.$watch(scope, 'myterm')
        .throttle(1000)
        .map(function (e) {
            return e.newValue;
        })
        .do(function () {
            // Set loading and reset data
            scope.data = [];
        })
        .flatMapLatest(moviesdb.getMovies)
        .subscribe(function (data) {
            // Set the data
            scope.data = data;
        },function(err){
            console.log(err)
        });
});