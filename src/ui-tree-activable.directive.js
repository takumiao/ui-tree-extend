angular.module('ui.tree')
  .directive('uiTreeActivable', ['$parse', function($parse) {
    return {
      restrict: 'A',
      compile: function(elem, attrs) {
        return function postLink(scope, elem, attrs) {
          var activeNodeGetter = $parse(attrs.activeNode);
          var activeNodeSetter = activeNodeGetter.assign;
          var activeNode = activeNodeGetter(scope);

          // Events:
          var onBeforeActive = $parse(attrs.onBeforeActive)(scope) || angular.noop;
          var onActive = $parse(attrs.onActive)(scope) || angular.noop;

          scope.$isActive = function(node) {
            return activeNode === node;
          };

          scope.$activate = function(nodeScope) {
            if (onBeforeActive(nodeScope) !== false) {
              activeNode = nodeScope.$modelValue;
              activeNodeSetter && activeNodeSetter(scope, activeNode);
              onActive(nodeScope);
            }
          };
        }
      }
    }
  }]);