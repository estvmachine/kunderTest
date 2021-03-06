angular.module('starter.controllers')

.controller('FilmDetailCtlr', function($scope, $ionicModal, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,
  favoritesService, playlistService) {

    $scope.$parent.showHeader();
    $scope.$parent.setHeaderFab('right');

    $timeout(function () {
                      document.getElementById('fab-film-single').classList.toggle('on');
                  }, 900);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

  $scope.addFavorites= function(){
      favoritesService.add($stateParams.filmId)
    }

  $scope.initPage= function(){
    searchFilmForId($stateParams.filmId);
    $scope.isInPlayList= playlistService.find($stateParams.filmId);
    $scope.isInFavorites= favoritesService.find($stateParams.filmId);
  }

  $scope.addPlaylist= function(){
    playlistService.add($stateParams.filmId);
  }

  var searchFilmForId= function(id){
    var searchParams= {};
    searchParams.i =  id;

    $http({
        method: 'GET',
        url: 'https://www.omdbapi.com/',
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
