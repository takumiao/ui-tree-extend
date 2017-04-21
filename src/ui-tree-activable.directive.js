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
          var onBeforeActiveCallback = $parse(attrs.onBeforeActive);
          var onActiveCallback = $parse(attrs.onActive);

          scope.$isActive = function(node) {
            return activeNode === node;
          };

          scope.$activate = function(nodeScope) {
            if (onBeforeActiveCallback(scope, {$scope: nodeScope}) !== false) {
              activeNode = nodeScope.$modelValue;
              activeNodeSetter && activeNodeSetter(scope, activeNode);
              onActiveCallback(scope, {$scope: nodeScope});
            }
          };
        }
      }
    }
  }]);