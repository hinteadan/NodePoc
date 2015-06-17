(function (angular) {

    'use strict';

    angular.module('app', ['ng', 'ngRoute'])
    .config(['$routeProvider', function ($rp) {
        $rp
        .when('/browse', { templateUrl: 'scripts/view/browse.tmpl.html', controller: 'browse' })
        .otherwise({
            redirectTo: '/browse'
        });
    }]);


})(angular);