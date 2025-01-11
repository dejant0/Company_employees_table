angular.module('myApp')
  .component('userDetails', {
    bindings: {
      selectedUser: '<',
      onClose: '&',
      onDelete: '&'
    },
    templateUrl: 'components/user-details/user-details.component.html',
    controller: function() {
      var vm = this;
    vm.deleteUser = function() {
      if (confirm("Are you sure you want to delete this record?")) {
          vm.onDelete(); 
        }
    }
  }
  });
