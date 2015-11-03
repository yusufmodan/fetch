angular.module('fetch.services', [])

.factory('TokenAttacher', function($window) {
  var attachConfig = {};

  attachConfig.attachConfig = function(config) { 
    var jwt = $window.localStorage.getItem('fetchadog');
    if (jwt) {
      //attach token to cors headers at 'x-access '
      config.headers['x-access-token'] = jwt;
    }
    config.headers['Allow-Control-Allow-Origin'] = '*';
    return config;
  };

  return attachConfig;
})



.factory('DogFactory', function($http, $window) {
  var processSelection = function(activity) {
    console.log('in dog factory processSelection')
    return $http({
      method: 'POST',
      url: '/processSelection',
      params: {
        activity: activity,
        token: $window.localStorage.getItem('fetchadog')
      }
    })
  };

  return {
    processSelection: processSelection
  };
})

.factory('ShelterFactory', ['$http', '$state', function($http, $state) {

  var addDog = function(dog) {
    return $http({
        method: 'POST',
        url: '/addDog',
        params: {
          dog: dog,
          token: $window.localStorage.getItem('fetchadog')
        }
      })
      .then(function(resp) {
        $state.go('shelterDogs');
        console.log('dog communicated to server');
      })
  }

  var confirmReturn = function(dogID) {
    return $http({
      method: 'POST',
      url: '/confirmReturn',
      params: {
        id: dogID,
        token: $window.localStorage.getItem('fetchadog')
      }
    })
  }

  var loadDogs = function() {
    return $http({
        method: 'POST',
        url: '/loadDogs',
        token: $window.localStorage.getItem('fetchadog')
      })
      .then(function(resp) {
        console.log('resp:', resp.data)
        return resp.data;
      })
  }

  return {
    addDog: addDog,
    confirmReturn: confirmReturn,
    loadDogs: loadDogs
  }

}])

.factory('AuthorizationFactory', ['$http', '$state', '$window', function($http, $state, $window) {

  var login = function(user) {
    return $http({
        method: 'POST',
        url: '/login',
        params: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          token: $window.localStorage.getItem('fetchadog')
        }
      })
      .success(function(response) {
        $window.localStorage.setItem('fetchadog', response.jwt);
        $state.go(response.url);
      });
  };

  var register = function(user) {
    return $http({
        method: 'POST',
        url: '/register',
        params: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          token: $window.localStorage.getItem('fetchadog')

        }
      })
      .success(function(response) {
        $state.go(response);
      });
  };

  var shelterLogin = function(shelter) {
    return $http({
        method: 'POST',
        url: '/shelterLogin',
        params: {
          email: shelter.email,
          displayName: shelter.displayName,
          password: shelter.password,
          token: $window.localStorage.getItem('fetchadog')

        }
      })
      .success(function(response) {
        $state.go(response);
      });
  };

  var shelterRegister = function(shelter) {
    return $http({
        method: 'POST',
        url: '/shelterRegister',
        params: {
          email: shelter.email,
          displayName: shelter.displayName,
          password: shelter.password,
          token: $window.localStorage.getItem('fetchadog')
        }
      })
      .success(function(response) {
        $state.go(response);
      });
  };

  var logout = function() {
    $window.localStorage.removeItem('fetchadog')
  };

  return {
    login: login,
    register: register,
    shelterLogin: shelterLogin,
    shelterRegister: shelterRegister,
    logout: logout

  };


}]);
