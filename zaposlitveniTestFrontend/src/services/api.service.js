angular.module('myApp')
  .factory('ApiService', function($http) {
    var apiUrl = 'http://localhost:5000/users';

    return {
      getUsers: function() {
        return $http.get(apiUrl).then(function(response) {
          return response.data;  
        }, function(error) {
          console.error('Napaka pri pridobivanju podatkov:', error);
          return [];
        });
      },
      deleteUser: function(id) {
        return $http.delete(apiUrl + '/' + id).then(response => response.data);
      },
      addUser: function(user) {
        return $http.post(apiUrl, user).then(function(response) {
          return response.data;  // Return the newly created user data
        }, function(error) {
          console.error('Napaka pri dodajanju uporabnika:', error);
        });
      }

    };
  });
