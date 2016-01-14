(function () {
    "use strict";

    angular
    .module('admin')
    .controller('LoginController', loginController);

    function loginController($log, $timeout, $appFactory, $cookies, $state) {
        var vm = this;

        //Click Event - TO AUTHENTICATE
        vm.auth = function (invalid) {
            if (invalid) {
                alert('Please enter username and password');
                return;
            }
            var data = {
                name: vm.username,
                password: vm.password
            };

            if (data) {
                $appFactory.Authenticate(data).then(function (response) {
                    if (response && response.status && response.status.indexOf('success') > -1) {
                        $cookies.put('id', response.records.id);
                        $cookies.put('name', response.records.name);
                        $cookies.put('accesstoken', response.records.accesstoken);

                        $state.go('home');
                    }
                    else {
                        alert(response.emsg);
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            }
        }
    }
})();