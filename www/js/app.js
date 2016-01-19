// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic' ,'ui.utils.masks' ,'ionicSelect' ,
  'starter.controllers','starter.controllers.cam' , 'start.controllers.social',
  'starter.services', 'starter.services.cam','starter.directives',
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

  .state('app.inicio', {
        url: '/inicio',
        views: {
            'menuContent': {
                templateUrl: 'templates/inicio.html',
                controller: 'WelcomeCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
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
                controller: 'CadastroCtrl'
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
                controller: 'MapaCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

   .state('app.area-restrita', {
        url: '/area-restrita',
        views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita.html',
                controller: 'PerfilCtrl'
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

   .state('app.denuncias', {
        url: '/denuncias',
        views: {
            'menuContent': {
                templateUrl: 'templates/denuncias.html',
                controller: 'DenunciasCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ng-click="addDenuncia()" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($scope,$timeout,$state) {
                    $timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 300);
                    $scope.addDenuncia = function(){
                       console.log("Go To: add-denuncia");
                       $state.go("app.add-denuncia"); 
                    };
                }
            }
        }
    })

    .state('app.enviar', {
        url: '/enviar/:denunciaId',
        views: {
            'menuContent': {
                templateUrl: 'templates/denuncia-local.html',
                controller: 'EnviarCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ng-click="enviarDenuncia(denuncia)" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-ios-cloud-upload"></i></button>',
                controller: function ($scope,$timeout,$state,$ionicLoading) {
                    $timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 300);
                    $scope.enviarDenuncia = function(){
                       console.log("Go To: enviar");
                       //$state.go("app.add-denuncia");
                       $ionicLoading.show({
                         template: "Enviando Denuncia...",
                         duration: 1000
                       });
                    };
                },
            }
        }
    })

   .state('app.denuncia-historico', {
      url: '/denuncias/:denunciaId',
      views: {
        'menuContent': {
          templateUrl: 'templates/denuncia-historico.html',
          controller: 'denunciaHistoricoCtrl'
        },
        'fabContent':{
          template : ''
        }
      }
    })

   .state('app.add-denuncia', {
        url: '/add-denuncia',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-denuncia.html',
                controller: 'AddDenunciaCtrl'
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
                controller: 'ArquivosCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ng-click="takePicture()" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-camera"></i></button>',
                controller: 'ArquivosCtrl'
            }
        }
    });
  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:

  // if none of the above states are matched, use this as the fallback
  if(localStorage) {
    $urlRouterProvider.otherwise('/app/inicio');
  }
  else {
    $urlRouterProvider.otherwise('/app/inicio');
  }
}])
;
