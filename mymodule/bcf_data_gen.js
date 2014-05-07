/**
 * accessKey 为你的APPkey
 * secrectKey 为你的密钥
 * bucket你文件存储的bucket
 * objectPre 你文件的文件夹
 * 
 */
var bcs = require('./bcs_data');
var http = require('http');
var fs=require('fs');
var accessKey,secrectKey,host,bucket,objectPre;
accessKey ='add you key';
secrectKey ='add you screctKey';
bucket ='bucket';
host = 'bcs.duapp.com';
objectPre = '/objectPre/'

exports.getFile = function(name,fn){
  object=objectPre+name;
  var path = bcs.gensign(accessKey,secrectKey,'MBO','GET',bucket,object);
  var opts = {
    host:host,
    path:path.path,
    method:'get'
  }
  var req = http.request(opts,function(res){
    res.on('data',function(data){
      fn(data.toString());
    });
  });
  req.end();
};


exports.genBlogdata = function(blog,filename){
  object=objectPre+filename;
  var data = blog.textcon;
  var path = bcs.gensign(accessKey,secrectKey,'MBO','PUT',bucket,object);
  var opts = {
    host:host,
    path:path.path,
    method:'PUT'
  };
  var req = http.request(opts,function(res){
    res.on('data',function(chunk){})
  });
  req.setHeader('Content-Type', 'text/plain');
  var buf = new Buffer(data);
  req.setHeader('Content-length',buf.length);
  req.write(data);
  req.end();
  // fs.open(filename, 'w+',function(err,fd){
  // 	fs.write(fd,blog.textcon,0,'utf8',function(err){
  // 	  if(err) throw err;
  // 	  fs.close(fd);
  // 	});
  // });
};
exports.updateBlogs = function(blog,hash,fn){
  exports.getFile('blog.json',function(data){
    object=objectPre+'blog.json';
    var blogs = JSON.parse(data.toString());
    var newB = {
      "title":blog.textname,
       "hash":hash,
       "chaiyao":blog.zhaiyao,
       "type":blog.texttype
    }
    blogs.con.unshift(newB);
    blogs = JSON.stringify(blogs);

    var path = bcs.gensign(accessKey,secrectKey,'MBO','PUT',bucket,object);
    var opts = {
      host:host,
      path:path.path,
      method:'PUT'
    };
    var req = http.request(opts,function(res){
      res.on('data',function(chunk){
        fn();
      })
    });
    req.setHeader('Content-Type', 'text/plain');
    var buf = new Buffer(blogs);
    req.setHeader('Content-length',buf.length);
    req.write(blogs);
    req.end();
  })
};
exports.updateIPS = function(ip){
  exports.getFile('ips.json',function(data){
    object=objectPre+'ips.json';
    var ips = data.toString()+' | '+ip;
    var path = bcs.gensign(accessKey,secrectKey,'MBO','PUT',bucket,object);
    var opts = {
      host:host,
      path:path.path,
      method:'PUT'
    };
    var req = http.request(opts,function(res){
      res.on('data',function(chunk){
        fn();
      })
    });
    req.setHeader('Content-Type', 'text/plain');
    var buf = new Buffer(ips);
    req.setHeader('Content-length',buf.length);
    req.write(ips);
    req.end();
  })
}