(function () {
    "use strict";

    angular
    .module('admin')
    .factory('$appFactory', appFactory);

    function appFactory($http, $q, $appConfig) {

        function authenticate(data) {
            var deferred = $q.defer();
            $http.post($appConfig.apiUrl + 'authenticate', data).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function addRooms(data) {
            var deferred = $q.defer();

            $http.post($appConfig.apiUrl + 'room', data).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function getRooms() {
            var deferred = $q.defer();

            $http.get($appConfig.apiAdminUrl + 'room').success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function addProducts(data) {
            var deferred = $q.defer();

            $http.post($appConfig.apiUrl + 'products', data).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function getProducts() {
            var deferred = $q.defer();

            $http.get($appConfig.apiUrl + 'products').success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function deleteProduct(id) {
            var deferred = $q.defer();

            $http.delete($appConfig.apiUrl + 'products/' + id).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function addAgents(data) {
            var deferred = $q.defer();

            $http.post($appConfig.apiUrl + 'agents', data).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function getAgents() {
            var deferred = $q.defer();

            $http.get($appConfig.apiUrl + 'agents').success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }

        function bookingSlots() {
            var deferred = $q.defer();

            $http.get($appConfig.apiAppUrl + 'users/slots').success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function productsList() {
            var deferred = $q.defer();

            $http.get($appConfig.apiAppUrl + 'users/products').success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function bookRoom(data) {
            var deferred = $q.defer();

            $http.post($appConfig.apiAppUrl + 'users/book', data).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function getBookings() {
            var deferred = $q.defer();

            $http.get($appConfig.apiAppUrl + 'users/bookings').success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }

        return {
            Authenticate: authenticate,
            AddRooms: addRooms,
            GetRooms: getRooms,
            AddProducts: addProducts,
            GetProducts: getProducts,
            Deleteproduct: deleteProduct,
            AddAgents: addAgents,
            GetAgents: getAgents,
            BookingSlots: bookingSlots,
            ProductsList: productsList,
            BookRoom: bookRoom,
            GetBookings: getBookings
        }
    }
})();