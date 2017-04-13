ui-tree-extend
==============

## Dependencies

- angular (1.2+)
- angular-ui-tree


## ui-tree-style

### Example
[https://jsfiddle.net/TakuMiao/z09momk5/](https://jsfiddle.net/TakuMiao/z09momk5/)

### Markup
```html
<link rel="stylesheet" href="./node_modules/angular-ui-tree/dist/angular-ui-tree.min.css" />
<link rel="stylesheet" href="./src/ui-tree-style.css" />
```


## ui-tree-adapter

### Example
[https://jsfiddle.net/TakuMiao/z09momk5/](https://jsfiddle.net/TakuMiao/z09momk5/)

### Markup
```html
<!-- Nested node template -->
<script type="text/ng-template" id="nodes_renderer.html">
  <div ui-tree-handle class="tree-handle"
    ng-class="{
      'tree-handle-closed': (collapsed && node.nodes.length),
      'tree-handle-open': (!collapsed && node.nodes.length)
    }">
    <i class="tree-toggle-icon" data-nodrag="" ng-click="toggle(this)"></i>    
    <div class="tree-node-anchor">
      <a class="pull-right" data-nodrag ng-click="vm.remove(this, $remove)">
        <span class="glyphicon glyphicon-remove"></span>
      </a>
      <a class="pull-right" data-nodrag ng-click="vm.newSubItem(this, $add)" style="margin-right: 8px;">
        <span class="glyphicon glyphicon-plus"></span>
      </a>
      <a class="pull-right" data-nodrag ng-click="vm.update(this)" style="margin-right: 8px;">
        <span class="glyphicon glyphicon-edit"></span>
      </a>
      <div class="tree-node-content">
        {{node.title}}
      </div>
    </div>
  </div>
  <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
    <li ng-repeat="node in node.nodes" ui-tree-node ng-include="'nodes_renderer.html'" ng-show="vm.visible(node)">
    </li>
  </ol>
</script>

<div ui-tree=""
  ui-tree-adapter ng-model="vm.flattenData"
  id-attr="id"
  parent-attr="pid"
  root-id="null"
  class="tree">
  <ul ui-tree-nodes="" ng-model="$data">
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