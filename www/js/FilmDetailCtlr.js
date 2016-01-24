angular.module('starter.controllers')

.controller('FilmDetailCtlr', function($scope, $ionicModal, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

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
