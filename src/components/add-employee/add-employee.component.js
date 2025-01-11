angular.module('myApp')
  .component('addEmployee', {
    bindings: {
        showModal: '<',
      onClose: '&',
      reloadUsers: '&'
    },
    templateUrl: 'components/add-employee/add-employee.component.html',
    controller: function(ApiService) {
      var vm = this;
      vm.newEmployee = {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: ''
      };
      vm.addEmployee = function() {
        if (vm.newEmployee.name && vm.newEmployee.username && vm.newEmployee.email) {
          ApiService.addUser(vm.newEmployee).then(function(response) {
            console.log('Employee added successfully:', response);
            vm.reloadUsers();
            vm.onClose();  // Close the modal after adding the user
          }, function(error) {
            console.error('Error adding employee:', error);
          });
        } else {
          alert('Please fill in all required fields.');
        }
      };
  }
  });
