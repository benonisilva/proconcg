// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic' ,'ui.utils.masks' ,'ionicSelect' ,
  'starter.controllers','stater.services.user','starter.services','starter.directives',
  'starter.config','ionic-material', 'ionMdInput','ngCookies','ngCordova'])

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

.constant('constantConfig', {
  url: 'http://192.168.1.108:8088/',
  httpTimeout: 5000
})

.config(['$stateProvider','$urlRouterProvider',
  '$ionicConfigProvider','$compileProvider','$httpProvider',
  function($stateProvider, $urlRouterProvider,
    $ionicConfigProvider,$compileProvider,$httpProvider) {

  //$compileProvider.imgSrcSanitizationWhitelist(/^\s(https|file|blob|cdvfile):|data:image\//); 
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];

  
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

  .state('app.perfil', {
        url: '/perfil',
        views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita/perfil/html/perfil.html',
                controller: 'PerfilCtrl as vm'
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
                templateUrl: 'templates/area-restrita/denuncias/html/denuncias.html'
            },
            'fabContent': ''
        }
    })

  .state('app.add-denuncia', {
        url: '/area-restrita/add/denuncia/:Id',
        views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita/denuncias/html/add-denuncia.html',
                controller : 'AddDenunciaCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
        },
        params: {
                profile: null
        },

        resolve:{
              Id: ['$stateParams', function($stateParams){
                  //$scope.$parent.clearFabs();
                  return $stateParams.Id;
              }]
           }
    })

  .state('app.denuncias-historico', {
        url: '/area-restrita/add/denuncia-historico',
        views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita/denuncias/html/denuncia-historico.html',
                controller : 'DenunciasHistoricoCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
        }
    })

  .state('app.denuncias-local', {
        url: '/area-restrita/add/denuncias-local',
        views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita/denuncias/html/denuncia-local.html',
                controller : 'DenunciaCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
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

  .state('app.eventos',{
    url : '/eventos',
    views: {
          'menuContent' : {
            templateUrl:'templates/ferramentas/eventos/html/eventos.html',
            controller: 'EventosCtrl as vm'
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
            templateUrl:'templates/ferramentas/informacoes/html/informacoes.html'
          },
          'fabContent': {
            template:''
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

   
  if(false) {

    if(false){
      console.log("app/login");
      $urlRouterProvider.otherwise('/app/perfil');
    }else{
      $urlRouterProvider.otherwise('/app/login');
      //alert("Cheque seu Email para ativar sua conta,após isso tera acesso ao sistema");
    }
    
  }
  else {
    $urlRouterProvider.otherwise('/app/home');
  }

}]);