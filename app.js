var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var loginCheck = require('./mymodule/login-check')
var dataGen = require('./mymodule/data_gen')
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('chenhui5416'));
app.use(session());

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
app.get('/edit',loginCheck.restrict,function(req,res){
	res.render('edit.ejs');
})

app.get('/login',function(req,res){
	res.render('login.ejs');
})
app.get('/',function(req,res){
  console.log(req.ip);
  dataGen.updateIPS(req.ip);
	res.render('index.ejs');
})

app.get('/blog',function(req,res){
  dataGen.getBlogs('jsons/blog.json',function(data){
    res.send(data);
  })
})
app.get('/author',function(req,res){
  dataGen.getBlogs('jsons/aboutme.json',function(data){
    res.send(data);
  })
});

app.get('/blog/:name',function(req,res){
	var name = req.params.name,blogUrl ='jsons/cn_hash_';
	blogUrl=blogUrl+name+".md";
  dataGen.getBlogFiles(blogUrl,function(data){
    res.send(data);
  });
})
app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
});
app.post('/editpost', function(req, res){
    if(req.session.user){
      var hash = (new Date())-0;
      var filename = 'jsons/cn_hash_'+hash+'.md';
      dataGen.genBlogdata(req.body,filename);
      dataGen.updateBlogs(req.body,hash,function(){
        res.redirect('/');
      });
    }else{
      res.send("<h1>你不是管理员！不给你发帖子！</h1>")
    }
});

app.listen(9001);

