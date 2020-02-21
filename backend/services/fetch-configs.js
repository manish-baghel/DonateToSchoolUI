const appConfigs = require('../consts/app-configs');
const fetch = require('node-fetch');
global.fetch = fetch
global.Headers = fetch.Headers;

const fetchConfig = (method, load, isMultipart, token) => {                                    
  const url = `${appConfigs.SERVER_URL}:${appConfigs.SERVER_PORT}`;                            
  const headers = new Headers();
  if (isMultipart) { 
    // headers.append('Content-Type', 'multipart/form-data');                                  
  }else {
    headers.append('Content-Type', 'application/json');                                        
  }
  //some new text added want to add more, need more testing                                    
  headers.append('Accept', 'application/json');                                                
  headers.append('Access-Control-Allow-Origin', url);                                          
  let authToken;
  if (token) {                 
    authToken = token;         
  } 
  if (authToken) {         
    headers.append(appConfigs.TOKEN_NAME, authToken);
  }
  if (headers.has(appConfigs.TOKEN_NAME)){
    console.log("fetchConfig token found ", headers.get(appConfigs.TOKEN_NAME));
  }else{
    console.log("Token not found in fetchConfig[fetch-configs.js]");
  }

  const config = {
    method: method,
    credentials: 'include',
    headers: headers
  };
  if (method === "post" || method === "put" || method ==="delete") {
    if (!isMultipart) {
      const payload = JSON.stringify(load);
      config.body = payload;
    } else {
      let payload = new FormData();
      Object.keys(load).forEach((key) => {
        payload.append(key, load[key]);
      });
      config.body = payload;
    }
  }

  return Object.assign({}, config);
}

module.exports = fetchConfig;