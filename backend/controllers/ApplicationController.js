const fetchConfig = require("../services/fetch-configs");
const apiService = require("../services/ApiService");

const home = async (req,res) => {
	console.log(req.headers);
	return res.render('index',{user:undefined,token:undefined});
}

// get controllers
const login = async (req,res) => {
	return res.render('login');
}
const signup = async (req,res) => {
	return res.render('sign_up');
}
const findSchool = async (req,res) => {
	let token = req.headers['xxx-don-auth-token'];
	let resData = await apiService.get('/getAllReqs',token);
	if(!resData)
		return res.render('donor/find_school', {msg:"No requirements listed yet"});
	let status= resData.status;
	let msg = resData.msg;
	let data = resData.data;
	res.render('donor/find_school',{status,msg,data});
}


// post controllers

const register = async (req,res) => {
	let {fname,lname,gender,password,email,phone} = req.body;
	let payload = {first_name:fname,last_name:lname,gender,password,email,phone};
	let resp;
	try{
		resp = await apiService.post("/register",payload);
	}catch(err){
		console.log(err);
		return res.render('sign_up',{status:false,msg:"Internal Server Error"});
	}
	if(!resp.status)
		return res.render('sign_up',{msg:resp.msg,status:false});
	let user = {
		first_name:resp.data.first_name,
		last_name:resp.data.last_name,
		email:resp.data.email,
		role:resp.data.role
	}
	let token = resp.data.token;
	return res.render('index',{token:token,user:user,msg:"User registered succesfully",status:true});
}

const signin = async (req,res) => {
	let {password,email} = req.body;
	if(! password || !email )
		return res.render('login',{status:false,msg:"Please enter all field"});
	let payload = {password,email};
	let resp;
	console.log("Logging in with ", email , " and " , password);
	try{
		resp = await apiService.post("/login",payload);
	}catch(err){
		console.log(err);
		return res.render('login',{status:false,msg:"Internal Server Error"});
	}
	if(!resp.status)
		return res.render('login',{msg:resp.msg,status:false});
	let user = {
		first_name:resp.data.first_name,
		last_name:resp.data.last_name,
		email:resp.data.email,
		role:resp.data.role
	}
	let token = resp.data.token;
	return res.render('index',{token:token,user:user,msg:"User logged in succesfully",status:true});
}


module.exports = {
	home:home,
	login:login,
	signup:signup,
	findSchool:findSchool,
	signin:signin,
	register:register
}