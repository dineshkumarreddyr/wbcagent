(function () {
    "use strict";

    angular
    .module('admin')
    .directive('datetimePicker', dateTimePicker)
    .directive('allowonlynumbers', allowOnlyNumbers);

    function dateTimePicker() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                element.datetimepicker({
                    minDate: new Date(),
                    format: 'DD-MMM-YYYY'
                });

                element.on('dp.change', function (e) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(e.date);
                    });
                });
            }
        }
    };

    function allowOnlyNumbers() {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('change', function (evt) {
                    evt = (evt) ? evt : window.event;
                    var charCode = (evt.which) ? evt.which : evt.keyCode;
                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        return false;
                    }
                    return true;
                });
            }
        }
    }
})();