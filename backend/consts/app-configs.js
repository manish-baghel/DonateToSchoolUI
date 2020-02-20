const env = require("../../env");

const appConfigs = {
	NODE_ENV : process.env.NODE_ENV,
	DEBUG : env.DEBUG,
	PORT : env.PORT,
	TOKEN_NAME : env.TOKEN_NAME,
	SERVER_URL : env.SERVER_URL,
	SERVER_PORT : env.SERVER_PORT,
	USER_EMAIL : "user_email",
	USER_NAME : "user_name",
	USER_PHONE : "user_phone",
	USER_ROLE : "user_role",
	USER_SCORE : "user_score",
}

module.exports = appConfigs;

