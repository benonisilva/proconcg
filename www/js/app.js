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
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)    
    //$http.defaults.headers.post['X-CSRFToken'] = $cookiesProvider.csrftoken;

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
  url: 'http://179.197.169.63:8088',
  httpTimeout: 5000
})

.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider','$compileProvider','$httpProvider',
  function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$compileProvider,$httpProvider) {

  //$compileProvider.imgSrcSanitizationWhitelist(/^\s(https|file|blob|cdvfile):|data:image\//); 
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
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
                templateUrl: 'templates/area-restrita/denuncias/html/denuncias.html',
                controller: 'DenunciaCtrl as vm'
            },
            'fabContent': {
                template: '<button id="fab-profile" ng-click="addDenuncia()" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($scope,$state) {
                                $scope.addDenuncia = function(){
                                   $state.go('app.add-denuncia');
                        }
                }
            }
        },
        params: {
                profile: null
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
                  return $stateParams.Id;
              }]
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

   
  if(localStorage) {
    $urlRouterProvider.otherwise('/app/home');
  }
  else {
    $urlRouterProvider.otherwise('/app/home');
  }

}]);