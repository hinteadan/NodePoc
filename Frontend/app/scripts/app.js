(function (angular) {

    'use strict';

    angular.module('app', ['ng', 'ngRoute'])
    .config(['$routeProvider', function ($rp) {
        $rp
            .when('/browse', { templateUrl: 'scripts/view/browse.tmpl.html', controller: 'browse' })
            .when('/login', { templateUrl: 'scripts/view/login.tmpl.html', controller: 'login' })
            .otherwise({
                redirectTo: '/login'
            });
    }]);


})(angular);