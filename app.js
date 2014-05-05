var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
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