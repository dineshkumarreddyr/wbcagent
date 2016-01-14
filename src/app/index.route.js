(function () {
    'use strict';

    angular
      .module('admin')
      .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
          .state('home', {
              url: '/wbc-agent',
              templateUrl: 'app/main/main.html',
              controller: 'MainController',
              controllerAs: 'vm'
          })
          .state('login', {
              url: '/',
              templateUrl: 'app/components/login/wbc.agent.login.html',
              controller: 'LoginController',
              controllerAs: 'vm'
          });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
})();
