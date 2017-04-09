angular.module('starter', ['ionic' ,'ui.utils.masks' ,'ionicSelect' ,
  'starter.controllers','stater.services.user','starter.services','starter.directives',
  'starter.config','ionic-material', 'ionMdInput','ngCordova'])

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
  url: 'http://proconwebapp-dev.sa-east-1.elasticbeanstalk.com',
  httpTimeout: 5000
})

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

  .state('app.codigo',{
      url : 'codigo',
      views: {
            'menuContent': {
                templateUrl: 'templates/ferramentas/codigo/codigo.html',
            },
            'fabContent': {
                template: ''
            }
    }
  })

  .state('app.denuncia-detalhe',{
      url : '/area-restrita/add/denuncia-detalhe/:denunciaId',
      views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita/denuncias/html/historico-detalhe.html',
                controller: 'HistoricoCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
       },
       resolve:{
              Id: ['$stateParams', function($stateParams){
                  console.log("app.denuncia-detalhe")
                  return $stateParams.denunciaId;
              }]
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