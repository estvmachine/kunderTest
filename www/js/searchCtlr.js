angular.module('starter.controllers')

.controller('SearchCtlr', function($rootScope,$scope, $ionicModal, $http , $timeout, ionicMaterialInk, ionicMaterialMotion) {

     $scope.$parent.showHeader();
    $scope.$parent.clearFabs();

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

  $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){ 

        if(toState.name=='app.search'){
          $scope.$parent.clearFabs();      
        }
  })

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
        url: 'https://www.omdbapi.com/',
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
