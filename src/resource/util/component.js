import {VALIDATION_INFO, VALIDATION_ERROR, VALIDATION_SUCCESS, VALIDATION_WARNING, MESSAGE, SPACE}  from '../../properties/url.js'
import * as objManager from '../../properties/obj_d3.js';

export const KEYCODE_SEPERATER = 'KEYCODE_SEPERATER';
export var keycodeString = '';
export function createNotification (NotificationManager, type, message) {
  return () => {
    switch (type) {
      case VALIDATION_INFO:
        NotificationManager.info( VALIDATION_INFO + SPACE + MESSAGE);
        break;
      case VALIDATION_SUCCESS:
        NotificationManager.success( VALIDATION_SUCCESS + SPACE + MESSAGE);
        break;
      case VALIDATION_WARNING:
        NotificationManager.warning( VALIDATION_WARNING + SPACE + MESSAGE);
        break;
      case VALIDATION_ERROR:
        NotificationManager.error( VALIDATION_ERROR + SPACE + MESSAGE);
        break;
    }
  };
};


export function addKeyDownListener(){
  function keyDownTextField(e) {
    var keyCode = e.keyCode;
    keycodeString += keyCode + KEYCODE_SEPERATER;
    console.log(keycodeString)
  }
  window.addEventListener("keydown", keyDownTextField, false);
}

export function changeSecretToQuestion(secret){
  // secret = '{' + secret
  // secret = secret.replace(objManager.ANSWER_NODE_SEPERATOR, ", ");
  // secret = secret.replace(objManager.ANSWER_LINE_SEPERATOR , "");
  var temp = '{';
  var parts = secret.split(objManager.ANSWER_NODE_SEPERATOR);
  for(var i=0;i<parts.length;i++){
    if(i == parts.length - 2){
      temp += parts[i] + '} => ';
      continue;
    }else if(i == parts.length - 1){
      temp += parts[i];
      continue;
    }
    temp += parts[i] + ',';
  }
  temp = temp.replace('begin,', '');
  temp = temp.replace(objManager.ANSWER_LINE_SEPERATOR, '')
  return temp;
}
