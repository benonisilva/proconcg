(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('CadastroCtrl', CadastroCtrl);
        CadastroCtrl.$inject = ['$scope','$state','$stateParams','$ionicLoading','CadastroService','EnderecoService'];

    function CadastroCtrl($scope,$state,$stateParams,
        $ionicLoading,CadastroService,EnderecoService) { 
    	var vm = this;
    	vm.user = {
            name: null,rg:null,
            cpf:null,telefone:null,
            email:null,
            endereco:{
                logradouro:null,
                localidade:null,
                uf:null,
                cep:null,
                bairro:null

            }
        };
    	vm.buscarEndereco = buscarEndereco;
    	vm.cadastraUser = cadastraUser;
        console.log("FBProfile");
        //console.log($stateParams||"null");
        var profileFBId = $stateParams.profile || "";
        console.log(JSON.stringify(profileFBId));
    	vm.user.name = profileFBId.name;
        vm.user.email = profileFBId.email;
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
                Cpf: user.cpf,
                Endereco: user.endereco.logradouro,
                Bairro : user.endereco.bairro,
                Complemento: user.endereco.complemento,
                Cidade: user.endereco.localidade,
                Cep: user.endereco.cep,
                UfId : 15, //LightBase
                Telefone:user.telefone,
                //TipoDoDocumentoId: user.tipoDocumento,
                Email: user.email,
                FacebookUserId: profileFBId || "",
                Rg: user.rg

            };
    		
            CadastroService.save(requerente).then(_fnSucessCadastro,_fnFailCadastro);

    	};

    	function _fnSucessCadastro (resp) {
    		
            if(resp===true){
                console.log("CadastroCtrl.cadastraUser.fnSucessCadastro: ");
                console.log(resp || "");
                hideLoading();
                alert("Link de confirmação foi enviado para seu email");
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
    		    duration:time || 1500,
    		    template:text || "..."
    		});	
    	};

    	function hideLoading () {
    		$ionicLoading.hide();	
    	};
    }	
})();