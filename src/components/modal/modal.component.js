angular.module('myApp')
  .component('modalComponent', {
    transclude: true, 
    bindings: {
      title: '@', //string binding
      showModal: '<', //one way data binding
      onClose: '&', //event binding
      onDelete: '&'
    },
    templateUrl: 'components/modal/modal.component.html',
    controller: function() {
      var vm = this;

      vm.close = function() {
        vm.onClose(); 
      };

      vm.deleteUser = function() {
        if (confirm("Are you sure you want to delete this record?")) {
            vm.onDelete(); 
          }
      }
    }
  });
