'use strict';

/**
 * @ngdoc service
 * @name angularDomoApp.services.ajax.domotic
 * @description
 * # serviceAjaxDomotic
 * Factory in the angularDomoApp.
 */
angular.module('starter.services.domotic', ['starter.services.common'])
    .factory('wsDomotic', function ($http, serviceCommon) {
        var host = "http://88.190.12.151:9199";
        var errorMessage = 'Erreur de connexion au serveur !';
    //var host = "localhost";
    return{
        light: function(){
            try {
                return $http.get(host+"/light/api/devices/"+serviceCommon.getToken())
                    .then(serviceCommon.checkApiReturn)
                    .then(serviceCommon.sendApiReturn);
            } catch(err) {
                serviceCommon.toast(errorMessage);
                return false;
            }
        },
        lightPut: function(action, name){
            try {
                return $http.get(host+"/light/api/put/"+serviceCommon.getToken()+"/"+action+"/"+name)
                    .then(serviceCommon.checkApiReturn)
                    .then(serviceCommon.sendApiReturn);
            } catch(err) {
                serviceCommon.toast(errorMessage);
                return false;
            }
        }
    }
  });
