var fs = require('fs');
exports.authenticate = function(name,pass,fn){
	fs.readFile('key_user/ower.json',function(err,data){
		var user = JSON.parse(data.toString());
		if(name==user.username&&pass==user.password){
			fn(true);
		}
		else{
			fn(false)
			console.log(name);
		}
	});
};
exports.restrict = function (req,res,next){
	if (req.session.user) {
  		next();
  	} else {
  	  	req.session.error = 'Access denied!';
   	  	res.redirect('/login');
  	}
};
