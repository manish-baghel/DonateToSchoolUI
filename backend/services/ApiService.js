const fetchConfig = require("./fetch-configs");
const appConfigs = require('../consts/app-configs');

const get = (path, token) => {
  const promise = new Promise((resolve, reject) => {

    const serverPath = `${appConfigs.SERVER_URL}:${appConfigs.SERVER_PORT}${path}`;
    const fetchConfigs = fetchConfig('get', null, false, token);
    fetch(serverPath, fetchConfigs).then((response) => {
      if (!response.ok) {
        if (response.status == 404) {
          errHandler({ type: errTypes.PAGE_NOT_FOUND });
        }
      } else {
        return response.json();
      }
    }).then((data) => {
      return resolve(data);
    }).catch((err) => {
      return reject(err);
    });
  });
  return promise;
}

const post = (path, payload, isMultipart) => {
  const promise = new Promise((resolve, reject) => {
    const serverPath = `${appConfigs.SERVER_URL}:${appConfigs.SERVER_PORT}${path}`;
    const fetchConfigs = fetchConfig('post', payload, isMultipart);
    console.log(serverPath,"   ",fetchConfigs);
    fetch(serverPath, fetchConfigs).then((response) => {

      if (!response.ok) {

        if (response.status == 404) {
          const newResponse = { status: false, msg: "Requested api not found" };
          return newResponse;
        } else if (response.status === 400) {
          throw response;
        }
      } else { 
        return response.json();
      }
    }).then((data) => {
      return resolve(data);
    }).catch((err) => {
      err.text().then(errMsg => {
        reject(JSON.parse(errMsg));
      })
    });
  });
  return promise;
}

const request = (method, path, payload, isMultipart) => {
  const newPromise = new Promise((resolve, reject) => {
    _request(method, path, payload, isMultipart, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    })
  });
  return newPromise;
}

async function _request(method, path, payload, isMultipart, cb) {
const serverPath = `${appConfigs.SERVER_URL}:${appConfigs.SERVER_PORT}${path}`;
  const fetchConfigs = fetchConfig(method, payload, isMultipart);
  try {
    console.log(serverPath,"   ",fetchConfigs);
    const response = await fetch(serverPath, fetchConfigs);
    if (!response.ok) {
      if (response.status == 404) {
        return cb(new Error("Request api not found"));
      }
    }
    return cb(null, response.json());
  } catch (err) {
    return cb(err);
  }
}


const apiService = {
  get:get,
  post:post,
  request:request
}

module.exports = apiService;