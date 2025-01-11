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
      


      ApiService.getUsers().then(function(users) {
        vm.people = users; 
      });


      vm.selectRow = function(person) {
        vm.selectedPerson = person;


      };

      vm.closeModal = function() {
        vm.selectedPerson = null;
      };

      vm.deleteUser = function() {
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
