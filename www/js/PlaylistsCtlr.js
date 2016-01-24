angular.module('starter.controllers')

.controller('PlaylistsCtlr', function($scope, $ionicModal, $http, $stateParams , $timeout, ionicMaterialInk, ionicMaterialMotion,
  favoritesService) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();


  $scope.initPage= function(){
    //$scope.searchFilm('frozen');
    console.log(favoritesService);
  }

  console.log('init page');

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
