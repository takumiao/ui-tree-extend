var angular = require('angular');
module.exports = 
	angular
		.module('ui.tree')
		.directive('uiTreeAdapter', require('./ui-tree-adapter.directive'))