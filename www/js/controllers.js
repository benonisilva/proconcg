angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$ionicPopup, $timeout,$ionicLoading,LoginService, $state, $ionicHistory) {
    
    $scope.loginData = { isAdmin : false };
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    $scope.setLoginData = function (data){
        $scope.loginData = data;
        return $scope.loginData;
    }

     $scope.sair = function () {
        
        var confirmaSairPopup = $ionicPopup.confirm({
            title: 'Sair',
            subTitle: 'Deseja Sair ?',
            cancelText: 'Não',
            okText: 'sim'
        });

        confirmaSairPopup.then(function(res) {
            console.log('Tapped!', res);
            if(res){
                LoginService.sair().then(function (result) {
                    $scope.setLogged(false);
                    $ionicHistory.clearCache();
                    $ionicHistory.removeBackView();
                    $ionicHistory.clearHistory();
                    $state.go("app.home");
                });
            }
        });    
        
     }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setLogged = function(bool) {
        $scope.logged = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.showLoading = function(msg, duration) {
     $ionicLoading.show({
      template: msg,
      duration: 1000 || duration
    });
  };
  
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };
});