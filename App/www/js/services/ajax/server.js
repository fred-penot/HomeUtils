'use strict';

/**
 * @ngdoc service
 * @name angularDomoApp.services.ajax.security
 * @description
 * # serviceAjaxSecurity
 * Factory in the angularDomoApp.
 */
angular.module('starter.services.server', ['starter.services.common'])
    .factory('wsServer', function ($http, serviceCommon) {
        var host = "http://88.190.12.151:9199";
        return{
            services: function(){
                return $http.get(host+"/server/api/services/"+serviceCommon.getToken())
                    .then(serviceCommon.checkApiReturn)
                    .then(serviceCommon.sendApiReturn);
            },
            connectHdd: function(token, action){
                return $http.get(host+"/server/api/service/hdd/"+token+"/"+action);
            },
            serviceUpnp: function(action){
                return $http.get(host+"/server/api/service/upnp/"+serviceCommon.getToken()+"/"+action)
                    .then(serviceCommon.checkApiReturn)
                    .then(serviceCommon.sendApiReturn);
            },
            serviceKodi: function(token, action){
                $http.get(host+"/server/api/service/kodi/"+token+"/"+action);
            },
            serviceKodiCheck: function(token){
                return $http.get(host+"/server/api/service/check/kodi/"+token);
            },
            serverDataUsage: function(){
                return $http.get(host+"/server/api/data/usage/"+serviceCommon.getToken())
                    .then(serviceCommon.checkApiReturn)
                    .then(serviceCommon.sendApiReturn);
            },
            serverFreeMemory: function(){
                return $http.get(host+"/server/api/data/memory/free/"+serviceCommon.getToken())
                    .then(serviceCommon.checkApiReturn)
                    .then(serviceCommon.sendApiReturn);
            },
            apacheRestart: function(token){
                $http.get(host+"/server/api/restart/apache/"+token);
                return true;
            },
            reboot: function(token){
                $http.get(host+"/server/api/reboot/"+token);
                return true;
            }
        }
    });