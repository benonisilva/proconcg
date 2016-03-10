// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic' ,'ui.utils.masks' ,'ionicSelect' ,
  'starter.controllers','stater.services.user','starter.services','starter.directives',
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
})

.constant('constantConfig', {
  url: 'http://192.168.56.1:8088/Home/',
  httpTimeout: 5000
})

.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider','$compileProvider',
  function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$compileProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|data):/);  
    
  var localStorage = window.localStorage['documento'];
  //if(localStorage) console.log(localStorage);
  //Debug
  $ionicConfigProvider.views.maxCache(0);
  
  $stateProvider

  .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
  })

  .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home/html/home.html',
                controller: 'HomeCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
        }
    })

  .state('app.cadastro', {
        url: '/home/cadastro',
        views: {
            'menuContent': {
                templateUrl: 'templates/home/html/cadastro.html',
                controller: 'CadastroCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
        },
        params: {
                profile: null
        }
    })

  .state('app.area-restrita', {
        url: '/area-restrita',
        views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita/html/denuncias.html'
            },
            'fabContent': {
                template: ''
            }
        },
        params: {
                profile: null
        }
    })

  .state('app.login', {
        url: '/home/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/home/html/login.html',
                controller: 'LoginCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
        }
    });

   
  if(localStorage) {
    $urlRouterProvider.otherwise('/app/home');
  }
  else {
    $urlRouterProvider.otherwise('/app/home');
  }

}]);
