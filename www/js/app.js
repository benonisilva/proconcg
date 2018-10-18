angular.module('starter', 
    [
        'ionic' ,
        'ui.utils.masks' ,
        'ionicSelect' ,
        'ionic-material', 
        'ionMdInput',
        'ngCordova',
        'ngFileUpload',
        'starter.controllers',
        'stater.services.user',
        'starter.services',
        'starter.directives',
        'starter.config',
        'area-restrita.module',
        'ferramentas.module'
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
  .state('app.localizacao',{
    url : '/localizacao',
    views: {
          'menuContent' : {
            templateUrl:'templates/ferramentas/localizacao/html/localizacao.html',
            controller: 'MapCtrl as vm'
          },
          'fabContent': {
            template:''
          }
    }

  })


  .state('app.info',{
    url : '/informacoes',
    views: {
          'menuContent' : {
            templateUrl:'templates/ferramentas/informacoes/html/informacoes.html',
            controller : 'InfoCtrl as vm'
          },
          'fabContent': {
            template:''
          }
    }

  })
  .state('app.config',{
      url : 'config',
      views: {
            'menuContent': {
                templateUrl: 'templates/ferramentas/config/config.html',
                controller: 'ConfigCtrl as vm'
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
    $urlRouterProvider.otherwise('/app/add/denuncia/0');

}]);