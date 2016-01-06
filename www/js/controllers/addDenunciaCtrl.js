angular.module('starter')
.controller('AddDenunciaCtrl', 
	['$scope', '$stateParams', 'DenunciasService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup','ArquivosFactory',
		function($scope, $stateParams, DenunciasService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,ArquivosFactory) {
			
      $scope.novaDenuncia = {};
      $scope.myActiveSlide = 0;

      $scope.showConfirm = function(denuncia) {
      
        var confirmPopup = $ionicPopup.confirm({
          title: 'Salvar No Celular',
          template: 'Deseja Salvar A Denuncia Para Posterior Envio?',
          buttons: [
            { text: 'Não' },
            { text: 'Sim', type: 'button-positive', 
              onTap: function(e) {
              //e.preventDefault();
              return true;
            }
          }]
        });

        confirmPopup.then(function(res) {
          console.log('Res: ' +res);
          if(res) {
            var nova = 
            {
              empresa:denuncia.empresa,
              ultimoParecer:"Enviado",
              data:"01/01/16",
              situacao: denuncia.situacao,
              descritivo: denuncia.descritivo,
              fotos: ArquivosFactory.all(),
              textoDaDenuncia: denuncia.denuncia,
              historico:[{situacao:"Enviado",local:"Aguardo",dataUltimaVisualizacao:"01/01/16"}]
            };
            DenunciasService.addLocal(nova);
            console.log('denuncia adicionada-local');
          } else {
            console.log('You are not sure');
          }
        });
      };



      $scope.enviarDenuncia = function(){
				DenunciasService.add(novaDenuncia);
			};

			$scope.nextSlide = function() {
        $timeout( function() {
          console.log("proximo");
          $ionicSlideBoxDelegate.next(500);
        }, 50);
  		};
      
      $scope.previousSlide = function() {
        console.log("voltar");
        $ionicSlideBoxDelegate.previous(500);
      };

       $scope.slideChanged = function(index) {
        console.log(index);
        $scope.slideIndex = index;
      };
  		
      var numeroDocumentoRequerente = window.localStorage['email'];
        /*console.log(numeroDocumentoRequerente);
        var novaDenuncia = {
        	id: '-1',
        	AssuntoID : 1,//novaDenuncia.assunto.id,
        	DescritivoID: 2,//novaDenuncia.descritivo.id,
        	AcaoID: 3,//novaDenuncia.desejo.id,
        	NotaFiscal : 4,//novaDenuncia.nota,
        	Protocolo: 5,//novaDenuncia.nOs,
        	Produto : 6,//novaDenuncia.item,
        	Empresa: novaDenuncia.empresa,
        	Denuncia: "",//novaDenuncia.denuncia,
        	DocumentoReclamante : ""//numeroDocumentoRequerente
      	};*/
      //console.log(novaDenuncia);
 
      //DenunciasService.add(nova);
      function addDenuncia(denuncia){
        DenunciasService.add(denuncia);
      };	
  	
}]);