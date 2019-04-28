import {SERVER, SERVER_ADD_USER, URL_HOME,METHOD_POST, HEADER_JSON, URL_UNDERSTAND
  , COOKIE_TOKEN_ID, SLASH, SERVER_USER}  from '../../properties/url.js'

var userData = {};

export function getCookie(cname) {
  if(cname == undefined){
    cname = COOKIE_TOKEN_ID;
  }
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}

export function getUserByTokenId(tokenId, callback) {
  console.log('tokenId' + SERVER + SERVER_USER + SLASH + tokenId)
  fetch(SERVER + SERVER_USER + SLASH + tokenId).then(data => data.json())
  .then((data) => {
         userData = data.username;
         callback(userData)
       });
}

export function logout(){
  document.cookie = COOKIE_TOKEN_ID + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
