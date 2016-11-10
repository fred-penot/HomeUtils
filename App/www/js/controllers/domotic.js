angular.module('starter.domotic', ['starter.services.common', 'starter.services.domotic'])

.controller('DomoticCtrl', function($scope, $cordovaToast, $ionicLoading, serviceCommon, wsDomotic) {
    refresh();
    $scope.refresh = function () {
        refresh();
    };
    $scope.putLight = function(index) {
        if ( !$scope.devices[index].loading ) {
            var name = $scope.devices[index].name;
            var putOn = $scope.devices[index].putOn;

            $scope.devices[index].loading = true;
            wsDomotic.lightPut(putOn, name).then(function(data) {
                if ( data.statut ) {
                    var toastText = "Lumière " + $scope.devices[index].label;
                    if ( putOn ) {
                        toastText += " allumée.";
                    } else {
                        toastText += " éteinte.";
                    }
                    wsDomotic.light().then(function(data) {
                        if ( data.statut ) {
                            $scope.devices = data.data.listeDevice;
                            serviceCommon.toast(toastText);
                        }
                        $scope.devices[index].loading = false;
                    });
                }
            });
        }
    };
    function refresh() {
        $ionicLoading.show({template: "chargement..."}).then(function(){});
        //$scope.devices[0].loading;
        //$scope.devices[0].loading;
        wsDomotic.light().then(function(data) {
            if ( data.statut ) {
                $scope.devices = data.data.listeDevice;
            }
            $ionicLoading.hide().then(function(){});
        });
    }
}).directive('domoticTemplate', function() {
    return {
        templateUrl: 'templates/domotic.html'
    };
});