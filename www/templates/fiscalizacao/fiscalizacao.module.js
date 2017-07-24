(function() {
    'use strict';
    angular.module('fiscalizacao.module',[])
      .config(routeConfig).run(function ($rootScope){
        
        $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
            console.log("cordovaInAppBrowser:loadstart");
        });

        $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
            // insert CSS via code / file
            $cordovaInAppBrowser.insertCSS({
                code: 'body {background-color:blue;}'
            });

            // insert Javascript via code / file
            $cordovaInAppBrowser.executeScript({
                file: 'script.js'
            });
            console.log("cordovaInAppBrowser:loadstop");
        });

        $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){
            console.log("cordovaInAppBrowser:loaderror");
        });

        $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){
             console.log("cordovaInAppBrowser:exit");
        });
      });

     function routeConfig($stateProvider) {
       $stateProvider.
        state('app.fiscalizacao', {
            url: '/fiscalizacao',
            views: {
                'menuContent': {
                    templateUrl: 'templates/fiscalizacao/fiscalizacao.html',
                    controller : 'FiscalizacaoCtrl as vm',
                    resolve : {
                        fiscalizacao : function(FiscalizacaoService){
                            return FiscalizacaoService.getFiscalizacao()
                        }
                    }
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.fiscalizacao-detalhes', {
            url: '/fiscalizacao-detalhes/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/fiscalizacao/fiscalizacao-detalhes.html',
                    controller : 'FiscalizacaoDetalheCtrl as vm',
                    // resolve : {
                    //     fiscalizacao : function(FiscalizacaoService){
                    //         return FiscalizacaoService.getFiscalizacao()
                    //     }
                    // }
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        ;
      };

})();
