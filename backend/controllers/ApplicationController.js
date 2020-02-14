const home = async (req,res) => {
	res.render('index');
}


const login = async (req,res) => {
	res.render('login');
}



const donate = async (req,res) => {
	res.render('donate');
}

const register = async (req,res) => {
	res.render('register');
}

const signin = async (req,res) => {
	res.render('signin');
}

module.exports = {
	home:home,
	login:login,
	donate:donate,
	signin:signin,
	register:register
}