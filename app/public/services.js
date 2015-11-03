angular.module('fetch.services', [])

.factory('TokenAttacher', function($window) {
  var attachConfig = {};

  attachConfig.attachConfig = function(config){
    var jwt = $window.localStorage.getItem('fetchadog');
    if (jwt) {
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
          dog: dog
        }
      })
      .then(function(resp) {
        $state.go('shelterDogs');
        console.log('dog communicated to server');
      })
  }

  var checkAvail = function(dogID) {
    console.log('in checkAvail')
    return $http({
        method: 'POST',
        url: '/checkAvail',
        params: {
          id: dogID
        }
      })
      .then(function(resp) {
        console.log('AVAILresp:', resp.data)
        return resp.data
      })
  }
  var confirmReturn = function(dogID) {
    return $http({
      method: 'POST',
      url: '/confirmReturn',
      params: {
        id: dogID
      }
    })
  }

  var loadDogs = function() {
    return $http({
        method: 'POST',
        url: '/loadDogs',
      })
      .then(function(resp) {
        console.log('resp:', resp.data)
        return resp.data;
      })
  }

  return {
    checkAvail: checkAvail,
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
          password: user.password
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
          password: user.password
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
          password: shelter.password
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
          password: shelter.password
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
