angular.module('starter.controllers')

.controller('PlaylistsCtlr', function($rootScope, $q, $scope, $ionicModal, $http, $stateParams , $timeout,
 ionicMaterialInk, ionicMaterialMotion,
  playlistService ) {

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


  //Cuando se detecta un cambio de estado al estado de esta pagina, se realiza una busqueda de las peliculas
  $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){ 

        if(toState.name=='app.playlists'){
            $scope.filmsFound=loadFilms(playlistService.indexFilms);
        }
  })

  //Cuando se inicia la pagina y da el caso que se inicia ya en este estado, se realiza una busqueda de las peliculas
    $scope.initPage= function(){
     $scope.filmsFound= loadFilms(playlistService.indexFilms);
  };

  //Cuando se detecta que la lista de peliculas esta cargada
  $scope.$watch('filmsFound', function(newVal){
    if(newVal){
      var films=[];
      newVal.then(function(values){
        values.forEach(function(film){
          //Se agrega pelicula a lista local
          console.log(film.data);
          films.push(film.data);
        })
      })
      $scope.filmsPlaylist=films;
    }
  })



  //Busqueda asincrona de todos los ids guardados en el servicio
   var loadFilms= function(listFilmIds){

    var promises = [];

    angular.forEach(listFilmIds , function(id) {

        var promise = $http({
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            params: {i : id}
        })

        promises.push(promise);

    });

    return $q.all(promises);

  }



})