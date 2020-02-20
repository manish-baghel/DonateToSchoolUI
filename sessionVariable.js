const yenv = require("yenv");
const getEnv = (environment) =>{
    const sessionVariables = yenv("settings.yaml", { env: environment});

    return sessionVariables;   

} 
  
module.exports = getEnv;                   