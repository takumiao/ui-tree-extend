angular
	.module('ui.tree')
	.directive('uiTreeAdapter', ['$parse', '$timeout', function($parse, $timeout) {
		return {
			restrice: 'A',
			require: 'ngModel',
			compile: function(tElem, tAttrs) {
				var idAttr = tAttrs.idAttr || 'id';
				var parentAttr = tAttrs.parentAttr || 'pid';
				var childrenAttr = 'nodes';		
				return function postLink(scope, elem, attrs, ngModelCtrl) {
					var rootId = angular.isDefined(attrs.rootId) ? $parse(attrs.rootId)(scope) : null;
					scope.$data = [];
					scope.$add = function(node) {
						ngModelCtrl.$modelValue.push(node);
					};
					scope.$remove = function(node) {
						var index = ngModelCtrl.$modelValue.indexOf(node);
						if (index > -1) {
							ngModelCtrl.$modelValue.splice(index, 1);
							// remove child nodes
							for (var i = 0, l = node.nodes.length; i < l; i++) {
								scope.$remove(node.nodes[i]);
							}
						}
					};
					scope.$watch(attrs.rootId, function(newValue, oldValue) {
						if (newValue === oldValue) return;
						rootId = newValue;
						scope.$data = treeify(ngModelCtrl.$modelValue, rootId, idAttr, parentAttr, childrenAttr);
					})
					scope.$watchCollection(function() {
						return ngModelCtrl.$modelValue
					}, function(newValue, oldValue) {
						scope.$data = treeify(newValue, rootId, idAttr, parentAttr, childrenAttr);
					});

					$timeout(function() {
						var dragStop = scope.$callbacks.dragStop;
						scope.$callbacks.dragStop = function(event) {						
							var sourceNodeScope = event.source.nodeScope;
							var destNodeScope = event.dest.nodesScope;
							var sortedNodes = destNodeScope.$modelValue;
							var sortedIndex = -1;
							// adjust parent of node
							sourceNodeScope.$modelValue.pid = destNodeScope.$nodeScope ? destNodeScope.$nodeScope.$modelValue.id : rootId
							// adjust original pos of flatten nodes by sorted nodes						
							// #bug convert structure JSON
							for (var i = 0, l = ngModelCtrl.$modelValue.length; i < l; i++) {
								var node = ngModelCtrl.$modelValue[i];
								if (node.pid == sourceNodeScope.$modelValue.pid) {
									var sortedNode = sortedNodes[++sortedIndex];
									node !== sortedNode && ngModelCtrl.$modelValue.splice(i, 1, sortedNode);
								}
							}
							console.log(sourceNodeScope.$modelValue, '->' , destNodeScope);
							dragStop(event);
						}
					});

					// http://stackoverflow.com/questions/22367711/construct-hierarchy-tree-from-flat-list-with-parent-field
					function treeify(list, rootId, idAttr, parentAttr, childrenAttr) {
				    var treeList = [];
				    var lookup = {};
				    list.forEach(function(obj) {
			        lookup[obj[idAttr]] = obj;
			        obj[childrenAttr] = [];
				    });
				    list.forEach(function(obj) {
			        if (obj[parentAttr] != rootId) {
			          var parent = lookup[obj[parentAttr]]
			          parent && parent[childrenAttr].push(obj);
			        } else {
			          treeList.push(obj); // build root node
			        }
				    });
				    return treeList;
					};
				}
			}
		}
	}]);