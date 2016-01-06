angular.module('starter')
.controller('denunciaHistoricoCtrl', ['$scope', '$stateParams', 'DenunciasService',
	function($scope, $stateParams, DenunciasService) {
		var denunciaId = $stateParams.denunciaId;
		$scope.denuncia = {};
  		$scope.denuncia = DenunciasService.get(denunciaId);
  		//console.log("scope: "+$scope.denuncia)
  	
}]);