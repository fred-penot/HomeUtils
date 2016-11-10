angular.module('starter.service', ['starter.services.common', 'starter.services.server'])

.controller('ServiceCtrl', function($scope, $ionicLoading, serviceCommon, wsServer) {
    var isHddConnect = false;
    refresh();
    $scope.putService = function(index) {
        if ( !$scope.services[index].loading ) {
            if ( isHddConnect ) {
                $scope.services[index].loading = true;
                if ( $scope.services[index].name == 'Upnp' ) {
                    wsServer.serviceUpnp($scope.services[index].info.action).then(function(data) {
                        if ( data.statut ) {
                            var toastText = "Le service Upnp est";
                            if ( data.data.isUshareRunning ) {
                                toastText += " lancé.";
                            } else {
                                toastText += " coupé.";
                            }
                            wsServer.services().then(function(data) {
                                if ( data.statut ) {
                                    isHddConnect = data.data.infoHdd.isConnect;
                                    $scope.services = data.data.services;
                                    serviceCommon.toast(toastText);
                                }
                            });
                        }
                    });
                } else if ( $scope.services[index].name == 'Kodi' ) {
                    serviceCommon.toast('Fonctionalité à venir.');
                    $scope.services[index].loading = false;
                }
            }
        }
    };
    function refresh() {
        $ionicLoading.show({template: "chargement..."}).then(function(){});
        wsServer.services().then(function(data) {
            if ( data.statut ) {
                isHddConnect = data.data.infoHdd.isConnect;
                $scope.services = data.data.services;
                $ionicLoading.hide().then(function(){});
            }
        });
    }
}).directive('serviceTemplate', function() {
    return {
        templateUrl: 'templates/service.html'
    };
});
