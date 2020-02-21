var idbDatabase;
var IDB_VERSION = 1;
var STOP_RETRYING_AFTER = 86400000; // One day, in milliseconds.
var STORE_NAME = 'urls';
var STORE_NAME_1 = 'kv';
var token_value = undefined;
var token_key = 'xxx-don-auth-token'; 

function openDatabaseAndReplayRequests() {
  var indexedDBOpenRequest = indexedDB.open('user-data', IDB_VERSION);

  indexedDBOpenRequest.onerror = function(error) {
    console.error('IndexedDB error:', error);
  };

  indexedDBOpenRequest.onupgradeneeded = function() {
    this.result.createObjectStore(STORE_NAME);
  };

  indexedDBOpenRequest.onsuccess = function() {
    idbDatabase = this.result;
    getTokenValue();
  };
}


function getObjectStore(storeName, mode) {
  return idbDatabase.transaction(storeName, mode).objectStore(storeName);
}

function getTokenValue() {
  getObjectStore(STORE_NAME_1).get(token_key).onsuccess = (event) => {
    if(event.target.result)
      token_value = event.target.result.toString();
  };
  // getObjectStore(STORE_NAME_1).openCursor().onsuccess = function(event) {
  //   var cursor = event.target.result;
  //   if(cursor){
  //     let key = cursor.value;
  //     console.log(cursor);
  //     if(cursor.key.toString() == token_key)
  //       token_value = key;
  //     else
  //       cursor.continue();
  //   }
  // }
}
openDatabaseAndReplayRequests();

self.addEventListener('fetch', event => {
  event.waitUntil(getTokenValue());
  event.respondWith(customHeaderRequestFetch(event))
})

function customHeaderRequestFetch(event) {
    if(!token_value){
      return fetch(event.request);
    }
    const newRequest = new Request(event.request, {
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'xxx-don-auth-token': token_value
      }
    });
    return fetch(newRequest);
}