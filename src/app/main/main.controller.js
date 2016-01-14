(function () {
    'use strict';

    angular
      .module('admin')
      .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, $log, $appFactory, $scope, lodash, $cookies) {
        var vm = this;
        vm.selectedSlots = null;
        vm.bookingGridOptions = {
            enableFiltering: true,
            columnDefs: [
                { field: 'type', displayName: 'Room Name', enableFiltering: true },
                { displayName: 'Book Date', field: 'bookdate', cellTemplate: '<div>{{row.entity[col.field] | date:\'dd-MMM-yyyy\'}}</div>', enableFiltering: true },
                { field: 'persons', displayName: 'Persons' },
                { field: 'name', displayName: 'Customer Name' },
                { field: 'mobile', displayName: 'Mobile Number' },
                { field: 'organization', displayName: 'Organization' },
                { field: 'bookingtype', displayName: 'Booking Type' },
                { displayName: 'Slots', field: 'selectedslots' },
                { field: 'selectedproducts', displayName: 'Products' },
                { field: 'createduser', displayName: 'Booked by' }
            ]
        }

        function init() {
            this.getBookingSlots = function () {
                $appFactory.BookingSlots().then(function (response) {
                    if (response && response.status) {
                        if (response.status.indexOf('success') > -1) {
                            vm.timeSlots = response.records[0].slots;
                        }
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            };
            this.getProductsList = function () {
                $appFactory.ProductsList().then(function (response) {
                    if (response && response.status) {
                        if (response.status.indexOf('success') > -1) {
                            vm.productLists = response.records;
                            //var v = lodash.chain(vm.productLists)
                            //        .groupBy("category")
                            //        .pairs()
                            //        .map(function (currentItem) {
                            //            return lodash.object(lodash.zip(["category", "products"], currentItem));
                            //        })
                            //        .value();
                        }
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            };
            this.getRooms = function () {
                $appFactory.GetRooms().then(function (response) {
                    if (response && response.status) {
                        if (response.status.indexOf('success') > -1) {
                            vm.rooms = response.records;
                        }
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            };
            this.getBookings = function () {
                $appFactory.GetBookings().then(function (response) {
                    if (response && response.status) {
                        if (response.status.indexOf('success') > -1) {
                            //vm.bookings = response.records;

                            vm.booking = response.records;

                            getSlots(vm.booking);
                            getProducts(vm.booking);
                            vm.bookingGridOptions.data = vm.booking;
                        }
                    }
                }, function (response) { });
            }
        }
        (new init()).getBookingSlots();
        (new init()).getProductsList();
        (new init()).getRooms();
        (new init()).getBookings();

        function getSlots(data) {
            lodash.each(data, function (i, v) {
                lodash.each(i.slots, function (j, w) {
                    if (i.selectedslots) {
                        i.selectedslots += ' , ' + j.from + ' ' + j.fromm + ' - ' + j.to + ' ' + j.tom;
                    }
                    else {
                        i.selectedslots = j.from + ' ' + j.fromm + ' - ' + j.to + ' ' + j.tom;
                    }
                });
            });
        }

        function getProducts(data) {
            lodash.each(data, function (i, v) {
                lodash.each(i.products, function (j, w) {
                    if (i.selectedproducts) {
                        i.selectedproducts += ' , ' + j.name;
                    }
                    else {
                        i.selectedproducts = j.name;
                    }
                });
            });
        }

        vm.bookRoom = function (invalid) {
            var order_id = 'WBC' + Math.random().toString().slice(2, 11);
            $cookies.put('order_id', order_id);
            if (invalid) {
                alert('Mandatory !!');
                return;
            }

            var data = {
                userid: 1,
                name: vm.name,
                organization: vm.organization,
                bookdate: vm.bookingdate,
                persons: vm.persons,
                type: vm.selectRooms,
                slots: vm.selectedSlots,
                products: vm.selectedProducts,
                bookingtype: 'Walkin',
                order_id: $cookies.get('order_id')
            }
            if (data) {
                $appFactory.BookRoom(data).then(function (response) {
                    if (response && response.status) {
                        if (response.status.indexOf('success') > -1) {
                            alert('Booking !!');

                            (new init()).getBookings();
                        }
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            }
        }
    }
})();
