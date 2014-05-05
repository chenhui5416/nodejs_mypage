var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var fs = require('fs');
var loginCheck = require('./mymodule/login-check')
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('chenhui5416'));
app.use(session());

app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
});
app.post('/login', function(req, res){
  	loginCheck.authenticate(req.body.username, req.body.password,function(data){
  		if(data){
	  		req.session.user = "admin";
  			req.session.success = "admin";
  			res.redirect('/edit')
  		}else{
  			res.send("<h1>管理员密码错误！请不要乱来！</h1>")
  		}
  	});
});
app.post('/editpost', function(req, res){
  	if(req.session.user){
  		console.log(req.body.textname)
  		res.send(req.body);
  	}else{
  		res.send("<h1>你不是管理员！不给你发帖子！</h1>")
  	}
});
app.get('/edit',loginCheck.restrict,function(req,res){
	res.render('edit.ejs');
})

app.get('/login',function(req,res){
	res.render('login.ejs');
})
app.get('/',function(req,res){
	console.log(req.session)
	var p = {title:'chenhui'}
	res.render('index.ejs',p);
})
app.get('/blog',function(req,res){
	fs.readFile('jsons/blog.json',function(err,data){
        if(err) throw err;
        res.send(data.toString());
	})
})

app.get('/blog/:name',function(req,res){
	var name = req.params.name,blogUrl ='jsons/cn_hash_';
	console.log(name);
	blogUrl+=name;
	blogUrl+=".md";
	console.log(blogUrl);
	fs.readFile(blogUrl,function(err,data){
        if(err) throw err;
        res.send(data.toString());
	})
})

app.listen(9001);

