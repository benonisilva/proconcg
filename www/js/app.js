// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic' ,'ui.utils.masks' ,'ionicSelect' ,
  'starter.controllers','starter.controllers.cam' ,'starter.services', 'starter.services.cam','starter.directives',
  'starter.config','ionic-material', 'ionMdInput'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)    
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
               

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
}).

constant('constantConfig', {
  url: 'http://192.168.56.1:8088/Home/',
  httpTimeout: 5000
})

.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',
  function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  var localStorage = window.localStorage['documento'];
  //if(localStorage) console.log(localStorage);
  $ionicConfigProvider.views.maxCache(0);
  
  $stateProvider

  .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
  })

  .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

   .state('app.cadastro', {
        url: '/cadastro',
        views: {
            'menuContent': {
                templateUrl: 'templates/cadastro.html',
                controller: 'DenunciaCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
   .state('app.localizacao', {
        url: '/localizacao',
        views: {
            'menuContent': {
                templateUrl: 'templates/localizacao.html',
                controller: 'MapCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

   .state('app.denuncias', {
        url: '/denuncias',
        views: {
            'menuContent': {
                templateUrl: 'templates/denuncias.html',
                controller: 'DenunciasCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

   .state('app.reclamacao', {
        url: '/reclamacao',
        views: {
            'menuContent': {
                templateUrl: 'templates/reclamacao.html',
                controller: 'ReclamacaoCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

   .state('app.info', {
        url: '/informacao',
        views: {
            'menuContent': {
                templateUrl: 'templates/informacao.html',
                controller: 'CamCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:

  ;

  // if none of the above states are matched, use this as the fallback
  if(localStorage) {
    $urlRouterProvider.otherwise('/app/denuncias');
  }
  else {
    $urlRouterProvider.otherwise('/app/login');
  }
}])
;
