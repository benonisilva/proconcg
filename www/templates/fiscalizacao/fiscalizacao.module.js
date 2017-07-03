(function() {
    'use strict';
    angular.module('fiscalizacao.module',[])
      .config(routeConfig);

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
        }).state('app.fiscalizacao-detalhes', {
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
