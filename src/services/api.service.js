angular.module('myApp')
  .factory('ApiService', function($http) {
    var apiUrl = 'https://jsonplaceholder.typicode.com/users';

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
      }
    };
  });
