const  get= (key)=> {   
    const value = window.localStorage.getItem(key);
    return value;              
  } 
  
const set=(key, value)=> {
    window.localStorage.setItem(key, value);
}     
      
const remove=(key)=> {
    localStorage.removeItem(key);   
}


const ls = {
	get:get,
	set:set,
	del:remove
}

module.exports = ls;