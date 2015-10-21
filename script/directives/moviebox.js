"use strict";

angular.module('myapp')
    .directive('movieBox', function(){
        return {
            restrict: 'E',
            scope:{
                movieData: '='
            },
            template: '<div>' +
            '<img ng-src="{{movieData.image_full_path}}" style="width:100%"><hr>' +
            '<h4>{{movieData.title}}</h4>' +
            '<p>{{movieData.overview}}</p>' +
            '</div>'
        }
    });