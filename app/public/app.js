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
  //every post request will contain the token if it exists because of this interceptor below
  $httpProvider.interceptors.push('TokenAttacher');

}])

.run(function($rootScope, $location, $window, $state){
  $rootScope.$on('$stateChangeStart', function(evt, nextState){
    if(nextState.authRequired && !$window.localStorage.getItem('fetchadog')){
      evt.preventDefault();
      $state.go('login');
    }
  })
});
