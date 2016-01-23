angular.module('starter.controllers')

.controller('SearchCtlr', function($scope, $ionicModal, $http) {

  $scope.$watch('search',function(newVal, oldVal){

    if(newVal)
      $scope.searchFilm(newVal);
    else{
      $scope.filmsFound=[]
    }
      
  })

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
