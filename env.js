const getEnv = require('./sessionVariable');
                               
// env 
const environment = process.env.ENV;
console.log("environment", environment);
if (!environment) {            
    console.error("please run application by providing environment");
    throw new Error("environment not found"); 
} 
const env = getEnv(environment);
  
module.exports = env;