export const NODE_SEPERATOR = 'NODE_SEPERATOR';
export function getClickedNode(node){
  var clickedNode = {
    currentNode: '',
    parents: '',
    time: ''
  };

  clickedNode.currentNode = node.data.name;
  clickedNode.time = node.time;
  while(node.parent !== null){
    clickedNode.parents += node.parent.data.name + NODE_SEPERATOR;
    node = node.parent;
  }

  return clickedNode;
}
