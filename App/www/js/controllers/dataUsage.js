angular.module('starter.datausage', ['starter.services.common', 'starter.services.server'])

.controller('DataUsageCtrl', function($scope, $cordovaToast, $ionicLoading, serviceCommon, wsServer) {
    var actionButtons = [];
    init(-1);
    function init(index) {
        if ( index < 0 ) {
            $ionicLoading.show({template: "chargement..."}).then(function(){});
        }
        actionButtons = [];
        actionButtons.push({
            action:"refresh",
            icon: "ion-ios-refresh-outline"
        });
        actionButtons.push({
            action:"freeMemory",
            icon: "ion-ios-trash-outline"
        });
        $scope.actionButtons = actionButtons;
        if ( index < 0 ) {
            refresh(index);
        }
    }
    $scope.launchAction = function (index) {
        var action = $scope.actionButtons[index].action;
        $scope.actionButtons[index].loading = true;
        if ( action == 'refresh' ) {
            refresh(index);
        } else if ( action == 'freeMemory' ) {
            freeMemory(index);
        }
    };
    function freeMemory(index) {
        wsServer.serverFreeMemory().then(function(data) {
            if ( data.statut ) {
                $scope.ramTotal = data.data.memoryFree;
                serviceCommon.toast(data.data.memoryFree + " libéré.");
                refresh(index);
            }
        });
    }
    function refresh(index) {
        wsServer.serverDataUsage().then(function(data) {
            if ( data.statut ) {
                $scope.ramTotal = data.data.ram.total;
                $scope.ramUsed = data.data.ram.used;
                $scope.ramFree = data.data.ram.free;
                $scope.disks = data.data.disk;
                if ( index >= 0 ) {
                    init(index);
                } else {
                    $ionicLoading.hide().then(function(){});
                }
            }
        });
    }
}).directive('datausageTemplate', function() {
    return {
        templateUrl: 'templates/dataUsage.html'
    };
});