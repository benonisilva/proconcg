angular.module('starter.config',[]).config(
	function($stateProvider, $urlRouterProvider, 
		$ionicConfigProvider) {
	
	$ionicConfigProvider.backButton.previousTitleText(false);
	$ionicConfigProvider.backButton.icon('ion-chevron-left');
	$ionicConfigProvider.backButton.text('Voltar');
	//$ionicConfigProvider.tabs.position('bottom');
});