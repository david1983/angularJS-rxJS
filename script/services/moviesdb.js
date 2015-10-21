"use strict"


angular.module('myapp').factory('moviesdb', ['$http', '$q', function($http, $q){
    var key = '870520dfaf4f85e4a9279f5069b54222';
    var base_url = 'https://api.themoviedb.org/3/';

    var moviedb = {};

    moviedb.getMovies= function(search){
        return $http.get(base_url + 'configuration' + "?api_key=" + key).then(function(configuration){
            return $http.get(base_url + 'search/movie?query=' + search + "&api_key=" + key).then(function(movies){
                var image_full_path = configuration.data.images.base_url + configuration.data.images.poster_sizes[5];
                return $q(function(resolve,reject){
                    angular.forEach(movies.data.results,function(item){
                        item.image_full_path = image_full_path + item.poster_path;
                    });
                    resolve(movies);
                })
            })
        });
    };
    return moviedb;
}]);
