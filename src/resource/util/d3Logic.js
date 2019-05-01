export const NODE_SEPERATOR = 'NODE_SEPERATOR';
export function getClickedNode(node){
  var clickedNode = {
    currentNode: '',
    parents: ''
  };

  clickedNode.currentNode = node.data.name;
  while(node.parent !== null){
    clickedNode.parents += node.parent.data.name + NODE_SEPERATOR;
    node = node.parent;
  }

  return clickedNode;
}
