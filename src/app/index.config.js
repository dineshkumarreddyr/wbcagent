(function () {
    'use strict';

    angular
      .module('admin')
      .config(config)
    .value('$appConfig', {
        apiUrl: 'http://localhost:3005/wbc/api/v1/agent/',
        apiAppUrl: 'http://localhost:3005/wbc/api/v1/',
        apiAdminUrl: 'http://localhost:3005/wbc/adminapi/v1/admin/'
    });

    /** @ngInject */
    function config($logProvider) {
        // Enable log
        $logProvider.debugEnabled(true);
    }
})();