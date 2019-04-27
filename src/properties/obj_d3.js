const GRAPH_MAX_PROGRESS_COUNT = 2;
export const ANSWER_NODE_SEPERATOR = "ANSWER_NODE_SEPERATOR";
export const ANSWER_LINE_SEPERATOR = "ANSWER_LINE_SEPERATOR";
export const ANSWER_UNDERSTANDABILITY =
	"begin" + ANSWER_NODE_SEPERATOR + "Popcorn=Y" + ANSWER_NODE_SEPERATOR + "Softdrink=Y" + ANSWER_NODE_SEPERATOR
	+ "{Movie_DVD=Y}" + ANSWER_LINE_SEPERATOR;


export const UNDERSTAND_DATA = {
 "name": "begin",
 "children": [
  {
   "name": "Popcorn=Y",
   "children": [
    {
     "name": "Softdrink=Y",
     "children": [
      {"name": "{Movie_DVD=Y}", "size": 3938},
      {"name": "{Snack=Y}", "size": 3938}
     ]
    }
   ]
  }
 ]
}


export var graphs = ['indentTree','indentTag', 'tabletool'];
