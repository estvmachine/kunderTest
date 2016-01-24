angular.module('starter.controllers')

.controller('PlaylistsCtlr', function($scope, $ionicModal, $http, $stateParams) {

  $scope.initPage= function(){
    $scope.searchFilm('frozen');
  }

  var searchFilmForId= function(id){
    var searchParams= {};
    searchParams.i =  id;

    $http({
        method: 'GET',
        url: 'http://www.omdbapi.com/',
        params: searchParams
      }).then(function successCallback(res) {
          var response= res.data;
          
          if(response.Response === 'True'){
              $scope.film= response;
          }
          
        }, function errorCallback(res) {
          console.log(res)
        });
  }

  $scope.searchFilm= function(search){
    var searchParams= {};
    searchParams.s =  search

    $http({
        method: 'GET',
        url: 'http://www.omdbapi.com/',
        params: searchParams
      }).then(function successCallback(res) {
          var response= res.data;
          
          if(response.Response === 'True'){
            if(response.totalResults.length >0){
              $scope.filmsFound= response.Search
              console.log( $scope.filmsFound);
            }
          }
          
        }, function errorCallback(res) {
          console.log(res)
        });
  }


})
