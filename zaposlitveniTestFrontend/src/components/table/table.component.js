angular.module('myApp')
  .component('tableComponent', {
    bindings: {
        tableTitle: '@' 
      },
    templateUrl: 'components/table/table.component.html',
    controller: function(ApiService) {
    
      var vm = this;
      vm.people = []; 
      vm.selectedPerson = null;
      vm.showAddEmployeeModal = false;


      vm.fetchUsers = function() {
        ApiService.getUsers().then(function(users) {
          vm.people = users;  
        }, function(error) {
          console.error('Error fetching users:', error);
        });
      };
  
      vm.fetchUsers();


      vm.selectRow = function(person) {
        vm.selectedPerson = person;


      };

      vm.onOpenAddEmployeeModal = function() {
        vm.showAddEmployeeModal = true;  
      };

      vm.closeAddEmployeeModal = function() {
        vm.showAddEmployeeModal = false;  
      };

      vm.closeModal = function() {//details modal
        vm.selectedPerson = null;
      };

      vm.deleteUser = function() {//details modal
          if (vm.selectedPerson) {
          ApiService.deleteUser(vm.selectedPerson._id).then(function() {
            vm.people = vm.people.filter(p => p._id !== vm.selectedPerson._id);
            vm.closeModal();
          }).catch(function(error) {
            console.error("Error deleting user:", error);
          });
        }
      };
    }
  });
