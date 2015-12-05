// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic' ,'ui.utils.masks' ,'ionicSelect' ,
  'starter.controllers' ,'starter.services', 'starter.directives',
  'starter.config'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    $rootScope.tabsHidden = false;
    
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

.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

  var localStorage = window.localStorage['documento'];
  //if(localStorage) console.log(localStorage);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.denuncia', {
    url: '/denuncia',
    views: {
      'tab-denuncia': {
        templateUrl: 'templates/tab-denuncia.html',
        controller: 'DenunciaCtrl'
      }
    }
  })

  .state('tab.reclamacao', {
    url: '/reclamacao',
    views: {
      'tab-denuncia': {
        templateUrl: 'templates/reclamacao.html',
        controller: 'DenunciaCtrl'
      }
    }
  })

  .state('tab.acompanhamento', {
      url: '/acompanhamento',
      views: {
        'tab-acompanhamento': {
          templateUrl: 'templates/tab-acompanhamento.html',
          controller: 'AcompanhamentoCtrl'
        }
      }
    })
    
  .state('tab.sobre', {
    url: '/sobre',
    views: {
      'tab-sobre': {
        templateUrl: 'templates/tab-sobre.html'
        //controller: 'AccountCtrl'
      }
    }
  }) 

  ;

  // if none of the above states are matched, use this as the fallback
  if(localStorage) {
    $urlRouterProvider.otherwise('/tab/reclamacao');
  }
  else {
    $urlRouterProvider.otherwise('/tab/denuncia');
  }
  

}])
;
