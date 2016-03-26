'use strict';

angular.module('app.core')



.directive('datetimepicker', function(){

    return {

        require: '?ngModel',

        restrict: 'A',

        link: function(scope, element, attrs, ngModel){


            if(!ngModel) return; // do nothing if no ng-model


            ngModel.$render = function(){

                element.find('input').val( ngModel.$viewValue || '' );

            }


            element.datetimepicker({ 

                language: 'it' 

            });


            element.on('dp.change', function(){

                scope.$apply(read);

            });


            read();


            function read() {

                var value = element.find('input').val();

                ngModel.$setViewValue(value);

            }

        }

    }

})




.directive('ngEnter', function () {
    return function ($scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 120) {
                scope.$apply(function (){
                    $scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})
 .directive('ngReallyClick', ['$modal', function($modal) {

        var ModalInstanceCtrl = function($scope, $modalInstance) {
            $scope.ok = function() {
                $modalInstance.close();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };        return {
            restrict: 'A',
            scope: {
                ngReallyClick: '&'
            },
            link: function(scope, element, attrs) {

                element.bind('click', function() {

                    var message = attrs.ngReallyMessage || 'Esta Usted seguro(a) ?';
                    var modalHtml = '<div class="modal-body">' + message + '</div>';
                    modalHtml += '<div class="modal-footer">';
                    modalHtml += '<button class="btn btn-primary" ng-click="ok()">OK</button>';
                    modalHtml += '<button class="btn btn-warning" ng-click="cancel()">';
                    modalHtml += 'Cancel</button>';
                    modalHtml += '</div>';

                    var modalInstance = $modal.open({
                        template: modalHtml,
                        controller: ModalInstanceCtrl
                    });

                    modalInstance.result.then(function() {
                        scope.ngReallyClick();
                    }, function() {
                        //Modal dismissed
                    });

                });

            }

        };

    }

])

.directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
      elem.on(attr.eventFocus, function() {
        focus(attr.eventFocusId);
      });
      
      // Removes bound events in the element itself
      // when the scope is destroyed
      scope.$on('$destroy', function() {
        element.off(attr.eventFocus);
      });
    };
  })



;
