//use $routeProvider or $uiRoute to navigate templates

angular.module('fetch', ['fetch.authorization', 'fetch.confirmation', 'fetch.selection', 'fetch.services', 'fetch.shelter', 'fetch.shelterDogs', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'angular-confirm', 'uiGmapgoogle-maps'])

.config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, $httpProvider) {

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDcBHkUsmjz7446x3lSUn3Gayuni5Ddn34',
    v: '3.20',
    libraries: 'weather,geometry,visualization'
  });

  $urlRouterProvider.otherwise('/chooseLogin');

  $stateProvider
    .state('chooseLogin', {
    url: '/chooseLogin',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/chooseLogin.html'
  })

  .state('userRegistration', {
    url: '/userRegistration',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/userRegistration.html'
  })

  .state('shelterRegistration', {
    url: '/shelterRegistration',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/shelterRegistration.html'
  })

  .state('login', {
    url: '/login',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/login.html'
  })

  .state('shelterDogs', {
    url: '/shelterDogs',
    controller: 'DogsController',
    templateUrl: 'shelterDogs/shelterDogs.html',
    authRequired: true
  })

  .state('shelterLogin', {
    url: '/shelterLogin',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/shelterLogin.html'
  })

  .state('logout', {
    url: '/login',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/login.html'
  })

  .state('selection', {
    url: '/selection',
    controller: 'SelectionController',
    templateUrl: 'selection/selectionView.html',
    authRequired: true
  })

  .state('confirmation', {
    url: '/confirmation/:dog', //if this doesn't work, remove url line or check out /confirmation/:dog
    // params:['dog'],
    controller: 'ConfirmationController',
    templateUrl: 'confirmation/confirmationView.html'
  })
  .state('shelterForm', {
    url:'/addDog',
    controller: 'ShelterController',
    templateUrl: 'shelterForm/shelterView.html',
    authRequired: true
  });

  $httpProvider.interceptors.push('TokenAttacher');

}])

.run(function($rootScope, $location){
  // if their next page request exists and next requiresAuth === true
  // and if they're logged in (have a jwt) and the jwt is not expired
    // UI route them new path
    // else send them to login
});
