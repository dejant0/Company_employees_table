angular.module('myApp')
  .component('userDetails', {
    bindings: {
      selectedUser: '<',
      onClose: '&',
      onDelete: '&'
    },
    templateUrl: 'components/user-details/user-details.component.html',

  });
