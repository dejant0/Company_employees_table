angular.module('myApp')
  .directive('onLongPress', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope,element , attrs) {
        let pressTimer;
        

        const longPressHandler = function() {
          console.log('Dolgi pritisk na vrstici!');
        };

        element.on('mousedown', function() {
          pressTimer = $timeout(longPressHandler, 1000); // 1 sekundo kot dolgi pritisk
        });

        element.on('mouseup', function() {
          $timeout.cancel(pressTimer); 
          
        });

        
        element.on('mouseleave', function() {
          $timeout.cancel(pressTimer); //ce se uprabnik premakne iz elementa se klik prekliče
        });

      }
    };
  });
