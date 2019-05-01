import {SERVER, SERVER_ADD_USER, URL_HOME,METHOD_POST, HEADER_JSON, URL_UNDERSTAND
  , COOKIE_TOKEN_ID, SLASH, SERVER_USER}  from '../../properties/url.js'
  
export function authen(){

  const data = new FormData();
  // var hashPassword = this.encryptPassword(this.state.password);
  fetch(SERVER + '/users/authen', {
    method: METHOD_POST,
    headers: HEADER_JSON,
    body: JSON.stringify({name: this.state.name,
                          password: this.state.password
                        })
  }).then(response =>
    response.json().then(data => ({
        data: data,
        status: response.status
    }))
  ).then(response => {
      if(response.data){
        var tokenId = response.data._id;
        // console.log(response);

        //set cookie for tokenId
        var mins = 20;
        var date = new Date();
        date.setTime(date.getTime() + (mins*60*1000));
        var expires = "expires="+ date.toUTCString();
        document.cookie = COOKIE_TOKEN_ID + "=" + tokenId + ";" + expires + ";path=/";

        window.location.href = URL_UNDERSTAND;
      }
  }).catch(error => {
    // console.log('login page ' + error);
    // component_manager.createNotification(NotificationManager, VALIDATION_ERROR);
    this.loginError();
  });
}
