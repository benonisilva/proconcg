angular.module('starter').
controller('DenunciasCtrl',['$scope','DenunciasService','$stateParams', 
    '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', '$ionicHistory',
	function($scope,DenunciasService, $stateParams, 
    	$timeout, ionicMaterialMotion, ionicMaterialInk,$ionicHistory){
		$ionicHistory.clearHistory();

        $scope.denuncias = {};
        $scope.denunciasLocal = {};
        $timeout(function() {
        	$scope.denuncias = DenunciasService.denuncias;
			//console.log($scope.denuncias);
            DenunciasService.allLocal().then(function(data){
                console.log(data);
                $scope.denunciasLocal = data;
                },function(erro){
                    console.log("error local");
                }
            );
            
        	//console.log('update denuncias: '+data);
    	}, 300);
        //return;
}])

.controller('EnviarCtrl',['$scope','DenunciasService','$stateParams', 
    '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk',
    function($scope,DenunciasService, $stateParams, 
        $timeout, ionicMaterialMotion, ionicMaterialInk){
        
        $scope.denuncia = {};
        $scope.fotos = {};
        $timeout(function() {
            //console.log($scope.denuncias);
            DenunciasService.getLocal($stateParams.denunciaId).then(function(data){
                console.log(data);
                $scope.denuncia = data;
                },function(erro){
                    console.log("error local");
                }
            );

        }, 0);

        $timeout(function() {
            //console.log($scope.denuncias);
            DenunciasService.getLocal($stateParams.denunciaId).then(function(data){
                console.log(data);
                $scope.denuncia = data;
                },function(erro){
                    console.log("error local");
                }
            );

        }, 0);

}])

;