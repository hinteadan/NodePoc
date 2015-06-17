(function (angular) {

    'use strict';

    angular.module('app')
        .controller('login', ['$scope', '$http', '$location', function ($s, $http, $l) {

            $s.loginInfo = {
                username: null,
                password: null
            };

            $s.login = function () {
                $http.put('http://localhost:1337', $s.loginInfo).then(function () {
                    $s.error = null;
                    $l.path('/browse');
                }, function () {
                    $s.error = 'Invalid credentials';
                });
            };

        }]);

})(angular);