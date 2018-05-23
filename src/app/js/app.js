'use strict';
angular.module('app', [
  'ngRoute',
  'app.filters',
  'app.services',
  'app.directives',
  'app.controllers'
]).
config([ '$routeProvider', function($routeProvider) {
    /*
    $routeProvider.when('/home', {
        templateUrl: 'src/app/partials/home.html',
        controller: 'HomeCtrl'
    });
    */
    $routeProvider.when('/graphs', {
        templateUrl: 'src/app/partials/graph.html',
        controller: 'GraphCtrl',
        controllerAs: 'vm'
    });
    /* users
    $routeProvider.when('/users', {
        templateUrl: 'src/app/partials/users/list.html',
        controller: 'UserListCtrl'
    });
    $routeProvider.when('/users/:userId', {
        templateUrl: 'src/app/partials/users/detail.html',
        controller: 'UserDetailCtrl'
    });
    $routeProvider.when('/insertuser', {
        templateUrl: 'src/app/partials/users/insert.html',
    });
    $routeProvider.when('/edituser/:userId', {
        templateUrl: 'src/app/partials/users/edit.html',
    });
    */
    $routeProvider.otherwise({ redirectTo: '/graphs' });
} ]);
