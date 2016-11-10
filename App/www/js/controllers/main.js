angular.module('starter.controllers',
    ['starter.services.security', 'starter.index', 'starter.login', 'starter.domotic',
      'starter.service', 'starter.datausage'])
.controller('AppCtrl', function($scope, $state, $ionicHistory, $ionicLoading, wsSecurity) {
  $ionicLoading.show({template: "chargement..."}).then(function(){});
  wsSecurity.checkAuth().then(function(data) {
    if ( data.statut ) {
      $ionicLoading.hide().then(function(){});
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.index');
    }
  });
});