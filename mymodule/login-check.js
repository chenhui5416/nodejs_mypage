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
   	  	res.send('<h1>不要乱来好不好，只有管理员可以进入编辑页面好不好，你想进入，那就登录啊！</h1>');
  	}
};
