(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('CadastroCtrl', CadastroCtrl);
        CadastroCtrl.$inject = ['$scope','$state','$stateParams','$ionicLoading','CadastroService','EnderecoService'];

    function CadastroCtrl($scope,$state,$stateParams,$ionicLoading,CadastroService,EnderecoService) { 
    	var vm = this;
    	vm.user = {
            name:"nome fake teste",rg:"123123",
            cpf:"03921117488",telefone:"8399991111",
            email:"benonisilva@hotmail.com",
            endereco:{
                logradouro:"rua qualquer",
                localidade:"Campina Grande",
                uf:"PB",
                cep:"58400565",
                bairro:"bairro"

            }
        };
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
                alert("Link de concifrmação foi enviado para seu email");
                //$state.go('app.home');

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