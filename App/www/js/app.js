angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
      localStorageServiceProvider
          .setPrefix('homeUtils');
      $stateProvider
          .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/main.html'
          })
          .state('app.main', {
            url: '/main',
            views: {
              'main': {
                controller: 'AppCtrl'
              }
            }
          })
          .state('app.index', {
            url: '/index',
            views: {
              'main': {
                templateUrl: 'templates/index.html',
                controller: 'IndexCtrl'
              }
            }
          })
          .state('app.login', {
            url: '/login',
            views: {
              'main': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
              }
            }
          })
          .state('app.domotic', {
            url: '/domotic',
            views: {
              'app-domotic': {
                templateUrl: 'templates/domotic.html',
                controller: 'DomoticCtrl'
              }
            }
          })
          .state('app.service', {
            url: '/service',
            views: {
              'app-service': {
                templateUrl: 'templates/service.html',
                controller: 'ServiceCtrl'
              }
            }
          })
          .state('app.datausage', {
              url: '/data-usage',
              views: {
                  'app-datausage': {
                      templateUrl: 'templates/dataUsage.html',
                      controller: 'DataUsageCtrl'
                  }
              }
          })
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/main');
    });