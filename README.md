ui-tree-extend
==============

Extension of `ui-tree` directive

## Dependencies

- angular
- [angular-ui-tree](https://github.com/angular-ui-tree/angular-ui-tree)


## ui-tree-style

### Example

[https://jsfiddle.net/TakuMiao/qb6ys45L/](https://jsfiddle.net/TakuMiao/qb6ys45L/)

### Markup
```html
<link rel="stylesheet" href="./node_modules/angular-ui-tree/dist/angular-ui-tree.min.css" />
<link rel="stylesheet" href="./src/ui-tree-style.css" />

<!-- Nested node template -->
<script type="text/ng-template" id="nodes_renderer.html">
  <div ui-tree-handle class="tree-handle"
    ng-class="{
      'tree-handle-closed': (collapsed && node.nodes.length),
      'tree-handle-open': (!collapsed && node.nodes.length)
    }">
    <i class="tree-toggle-icon" data-nodrag="" ng-click="toggle(this)"></i>    
    <div class="tree-node-anchor">
      <div class="tree-node-content">
        {{node.title}}
      </div>
    </div>
  </div>
  <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
    <li ng-repeat="node in node.nodes" ui-tree-node ng-include="'nodes_renderer.html'">
    </li>
  </ol>
</script>

<div ui-tree="" class="tree">
  <ul ui-tree-nodes="" ng-model="vm.data">
    <li ng-repeat="node in vm.data" ui-tree-node class="tree-node" 
      ng-include="'nodes_renderer.html'"></li>
  </ul>
</div>
```


## ui-tree-adapter

### Example

[https://jsfiddle.net/TakuMiao/c47pkwek/](https://jsfiddle.net/TakuMiao/c47pkwek/)

### Markup
```html
<!-- add ui-tree-adapter attributes to enable directive -->
<div ui-tree="" class="tree"
  ui-tree-adapter ng-model="vm.flattenData"
  id-attr="id" parent-attr="pid" root-id="null">
  <ul ui-tree-nodes="" ng-model="$data"><!-- use $data instead of origin data -->
    <li ng-repeat="node in $data" ui-tree-node class="tree-node" 
      ng-include="'nodes_renderer.html'"></li>
  </ul>
</div>
```

### Javascript
```js
angular
  .module('myApp', ['ui.tree'])
  .controller('MainController', [function() {
    vm.flattenData = [    
      {id: 1, pid: null, title: 'node1'},
      {id: 11, pid: 1, title: 'node1.1'},
      {id: 12, pid: 1, title: 'node1.2'},
      {id: 111, pid: 11, title: 'node1.1.1'},
      {id: 2, pid: null, title: 'node2'},   
      {id: 21, pid: 2, title: 'node2.1'},
      {id: 22, pid: 2, title: 'node2.2'},
      {id: 3, pid: null, title: 'node3'},
      {id: 31, pid: 3, title: 'node3.1'},
      {id: 4, pid: null, title: 'node4'},
      {id: 41, pid: 4, title: 'node4.1'}
    ]
  })]
```

### ui-tree-adapter options
- `ng-model` *(Array)* - the flatten node array
- `root-id` *(Number | Null)* - specify the root node id
- `id-attr` *(String)* - id attribute of node
- `parent-attr` *(String)* - parent attribute of node
- `show-root` *(Boolean)* - show root node


## ui-tree-activable

### Example

[https://jsfiddle.net/TakuMiao/qfehc9gy/](https://jsfiddle.net/TakuMiao/qfehc9gy/)

### Markup
```html
<!-- add ui-tree-activable attributes to enable directive -->
<div ui-tree  
  ui-tree-activable
  active-node="vm.activeNode"
  on-before-active="vm.onBeforeActive($scope)"
  on-active="vm.onActive($scope)">
  <ol ui-tree-nodes ng-model="vm.data">
    <li ng-repeat="node in vm.data" ui-tree-node ng-include="'nodes_renderer.html'"></li>
  </ol>
</div>
```

### Javascript
```js
angular
  .module('myApp', ['ui.tree'])
  .controller('MainController', [function() {
    vm.activeNode = null;
    vm.onBeforeActive = function(scope) {
      if (scope.$modelValue.id == 1) {
        alert('you can\'t select this node')
        return false;
      }
    };
    vm.onActive = function(scope) {
      console.log(scope.$modelValue);
    };
  })]
```

### ui-tree-activable options
- `active-node` *(Object)*
- `on-active` *(Function)* - this function will be invoked after the node is active.
- `on-before-active` *(Function)* - this function will be invoked before the node is active, you can return false to prevent the node is activated