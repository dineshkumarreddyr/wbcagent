(function () {
    "use strict";

    angular
    .module('admin')
    .directive('appHeader', appHeader);

    function appHeader() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/header/wbc.header.tmpl.html',
            controllerAs: 'svm',
            controller: function ($log, $timeout, $cookies, $state) {
                var vm = this;

                function activate() {
                    if ($cookies.get('name') != undefined && $cookies.get('accesstoken') != undefined) {
                        vm.loggedinuser = $cookies.get('name');
                    }
                    else {
                        $state.go('login');
                    }
                }
                activate();

                vm.logout = function () {
                    $cookies.remove('name');
                    $cookies.remove('accesstoken');
                    $cookies.remove('id');

                    $state.go('login');
                }
            }
        }
    }
})();