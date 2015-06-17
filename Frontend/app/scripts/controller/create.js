(function (angular) {

    'use strict';

    function UserDetails(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;

        this.fullName = function () {
            return firstName + ' ' + lastName;
        };
    }

    function User(id, username) {
        this.id = id;
        this.username = username;
        this.details = new UserDetails();
    }

    angular.module('app')
        .controller('create', ['$scope', '$http', '$location', function ($s, $http, $l) {

            $s.user = new User(null, '');

            $s.save = function () {
                $http.post('http://localhost:1337', $s.user).then(function () {
                    $s.error = null;
                    $l.path('/browse');
                }, function (err) {
                    $s.error = err.data;
                });
            };

        }]);

})(angular);