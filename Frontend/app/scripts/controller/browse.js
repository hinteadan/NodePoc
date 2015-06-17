(function (angular) {

    'use strict';

    angular.module('app')
        .controller('browse', ['$scope', '$http', function ($s, $http) {

            function refreshUsers() {
                $http.get('http://localhost:1337/').then(function (response) {
                    $s.users = response.data;
                });
            }

            $s.users = [];

            refreshUsers();

        }]);

})(angular);