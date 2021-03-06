var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var loginCheck = require('./mymodule/login-check')
var dataGen = require('./mymodule/bcf_data_gen')
var fs = require('fs');
var multipartMiddleware = multipart();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser({uploadDir: './uploads'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('chenhui5416'));
app.use(session());

app.post('/login', function(req, res) {
  console.log(req.body, req.files);
  	loginCheck.authenticate(req.body.username, req.body.password, function(data) {
  		if(data) {
	  		req.session.user = "admin";
  			req.session.success = "admin";
  			res.redirect('/edit')
  		} else {
  			res.send("<h1>管理员密码错误！请不要乱来！</h1>")
  		}
  	});
});

app.get('/img/:path', function(req, res) {
  var path = 'blogimg/' + req.params.path;
  dataGen.getImg(path, function(data) {
    res.send(data);
  });
})

app.get('/login', function(req, res) {
	res.render('login.ejs');
})
app.get('/', function(req, res) {
  console.log(req.ip);
	res.render('index.ejs');
})

app.get('/blog', function(req, res) {
  dataGen.getFile('blog.json', function(data) {
    res.send(data);
  });
})
app.get('/author', function(req,res) {
  dataGen.getFile('aboutme.json', function(data) {
    authorMes = data;
    res.send(data);
  })
});

app.get('/blog/:name', function(req, res) {
	var name = req.params.name, blogUrl = 'jsons/cn_hash_';
	blogUrl = blogUrl + name + ".md";
  dataGen.getFile(blogUrl, function(data) {
    res.charset = "utf8";
    res.set('Content-Type', 'text/plain');
    res.send(data);
  });
});

app.get('/comments/:comments', function(req, res) {
  var comments = req.params.comments, commentUrl = 'comments/';
  commentUrl = commentUrl + comments + '_comment.json';
  dataGen.getFile(commentUrl, function(data) {
    res.charset = "utf8";
    res.set('Content-Type', 'text/plain');
    res.send(data);
  });
});

app.post('/comments/:comments', function(req, res) {
  var comments = req.params.comments;
  dataGen.updateComment(req.body, comments, function() {
    res.send('ok');  //FIXED
  });
});

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

app.get('/edit', loginCheck.restrict, function(req, res) {
  res.render('edit.ejs');
})

app.post('/editpost', multipartMiddleware, function(req, res) {
    if(req.session.user) {
      var hash = (new Date())-0;
      var filename = 'jsons/cn_hash_'+hash+'.md';
      dataGen.genImageData(req.files);
      dataGen.genBlogdata(req.body, filename);
      dataGen.genCommentdata(hash);
      dataGen.updateBlogs(req.body, hash, function() {
        res.redirect('/');
      });
    } else {
      res.send("<h1>你不是管理员！不给你发帖子！</h1>")
    }
});
app.post('/image', multipartMiddleware, function(req, res) {
    if(req.session.user) {
      dataGen.genImageData(req.files, function() {
        res.send('ok');
      });
    } else {
      res.send("<h1>你不是管理员！不给你发帖子！</h1>")
    }
});

app.listen(9002);

