(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('CadastroCtrl', CadastroCtrl);
        CadastroCtrl.$inject = ['$scope','$state','$stateParams','$ionicLoading','CadastroService','EnderecoService'];

    function CadastroCtrl($scope,$state,$stateParams,$ionicLoading,CadastroService,EnderecoService) { 
    	var vm = this;
    	vm.user = {};
    	vm.buscarEndereco = buscarEndereco;
    	vm.cadastraUser = cadastraUser;
        console.log("FBProfile");
        console.log($stateParams||"null");
        var profileFBId = $stateParams.profile || "";
    	
        function buscarEndereco (cep) {
    		console.log("CadastroCtrl.buscarEndereco: "+cep);
    		EnderecoService.getEndereco(cep).then(_fnBuscaEnderecoSuccess,_fnBuscaEnderecoFail);
    	};

    	function _fnBuscaEnderecoSuccess(resp){
    		showLoading("Buscando...");
    		console.log("CadastroCtrl.buscarEndereco.fnBuscaEnderecoSuccess: ");
    		console.log(resp);
    		vm.user.endereco = resp;
    	};

    	function _fnBuscaEnderecoFail(resp){
    		console.log("CadastroCtrl.buscarEndereco.fnBuscaEnderecoFail: ");
    		console.log(resp);
    	};

    	function cadastraUser (user) {
    		showLoading("Salvando...");
    		console.log("CadastroCtrl.cadastraUser.fnBuscaEnderecoSuccess: ");
    		console.log(user);
            
            var requerente = {
                
                Nome: user.name,
                Documento: user.nDocumento,
                Endereco: user.endereco.logradouro + ", Complemento: " + user.endereco.complemento,
                Bairro : user.endereco.bairro,
                Cidade: user.endereco.localidade,
                Cep: user.endereco.cep,
                UfId : 15, //LightBase
                Telefone:user.telefone,
                TipoDoDocumentoId: user.tipoDocumento,
                Email: user.email,
                FacebookUserId: profileFBId

            };
    		
            CadastroService.save(requerente).then(_fnSucessCadastro,_fnFailCadastro);

    	};

    	function _fnSucessCadastro (resp) {
    		
            if(resp===true){
                console.log("CadastroCtrl.cadastraUser.fnSucessCadastro: ");
                console.log(resp || "");
                hideLoading();
                alert("Link de concifrmação foi enviado para seu email");
                $state.go('app.home');

            }
    
    	};

    	function _fnFailCadastro (resp) {
    		console.log("CadastroCtrl.cadastraUser.fnFailCadastro: ");
    		console.log(resp || "");
    		hideLoading();
    	};

    	function showLoading (text,time) {
    		$ionicLoading.show({
    		    content: 'Loading',
    		    animation: 'fade-in',
    		    showBackdrop: true,
    		    maxWidth: 200,
    		    showDelay: 0,
    		    duration:time || 15000,
    		    template:text || "..."
    		});	
    	};

    	function hideLoading () {
    		$ionicLoading.hide();	
    	};
    }	
})();