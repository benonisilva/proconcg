angular.module('starter', 
    [
        'ionic' ,
        'ui.utils.masks' ,
        'ionic-material', 
        'ionMdInput',
        'ngCordova',
        
        'starter.controllers',
        'starter.services',
        'starter.directives',
        'starter.config',
        'fiscalizacao.module'
    ])

.run(function($ionicPlatform,$rootScope) {  
    $ionicPlatform.ready(function() {
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
.filter("mydate", function() {
    var re = /\/Date\(([0-9]*)\)\//;
    return function(x) {
        var m = x.match(re);
        if( m ) return new Date(parseInt(m[1]));
        else return null;
    };
})
.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        console.log(url);
        return $sce.trustAsResourceUrl(url);
    };
}])

.config(['$stateProvider','$urlRouterProvider',
  '$ionicConfigProvider','$compileProvider','$httpProvider',
  function($stateProvider, $urlRouterProvider,
    $ionicConfigProvider,$compileProvider,$httpProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;

  
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
    $urlRouterProvider.otherwise('/app/home');

}]);