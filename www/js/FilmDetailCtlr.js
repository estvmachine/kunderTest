angular.module('starter.controllers')

.controller('FilmDetailCtlr', function($scope, $ionicModal, $http, $stateParams) {

  console.log($stateParams);


  $scope.initPage= function(){
    searchFilmForId($stateParams.playlistId);
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


})
