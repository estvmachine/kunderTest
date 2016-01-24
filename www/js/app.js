// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-material' , 'starter.controllers', 'starter.filters'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }, 
      'fabContent': {
            template: ''
        }
    }
  })
  .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html'
        }, 
        'fabContent': {
            template: '<button id="fab-playlists" ng-click="goToSearch()" class="button button-fab button-fab-top-right expanded button-energized-900 spin"><i class="icon ion-search"></i></button>',
             controller: function ($scope, $timeout, $state) {
                  $timeout(function () {
                      document.getElementById('fab-playlists').classList.toggle('on');
                  }, 900);

                  $scope.goToSearch = function(){
                    //$state.go('app.search');
                  }
            }
        }
      }
    })

  .state('app.favorites', {
      url: '/favorites',
      views: {
        'menuContent': {
          templateUrl: 'templates/favorites.html'
        }, 
        'fabContent': {
            template: '<button id="fab-favorites" ng-click="goToSearch()" class="button button-fab button-fab-top-right expanded button-energized-900 spin"><i class="icon ion-search"></i></button>',
             controller: function ($scope, $timeout, $state) {
                  $timeout(function () {
                      document.getElementById('fab-favorites').classList.toggle('on');
                  }, 900);

                  $scope.goToSearch = function(){
                    //$state.go('app.search');
                  }
            }
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:filmId',
    views: {
      'menuContent': {
        templateUrl: 'templates/filmDetail.html'
        },
        'fabContent': {
            template: '<button id="fab-film-single" ng-click="addFavorites()" class="button button-fab button-fab-top-right expanded button-energized-900 spin"><i class="icon ion-heart"></i></button>',
             controller: function ($scope,$timeout, $stateParams, favoritesService) {
                  $timeout(function () {
                      document.getElementById('fab-film-single').classList.toggle('on');
                  }, 900);

                  $scope.addFavorites= function(){
                    favoritesService.add($stateParams.filmId)
                  }
            }
        }
    }

  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
