/**
 * accessKey 为你的APPkey
 * secrectKey 为你的密钥
 * bucket你文件存储的bucket
 * objectPre 你文件的文件夹
 * 
 */
var bcs = require('./bcs_data');
var http = require('http');
var fs = require('fs');
var accessKey, secrectKey, host, bucket, objectPre;
accessKey = 'a';
secrectKey ='a';
bucket ='a';
host = 'bcs.duapp.com';
objectPre = '/a/';

exports.getFile = function(name, fn) {
  object = objectPre + name;
  var path = bcs.gensign(accessKey, secrectKey, 'MBO', 'GET', bucket, object);
  var opts = {
    host:host,
    path:path.path,
    method:'get'
  }
  var req = http.request(opts, function(res) {
    var data = "";
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      fn(data.toString());
    });
  });
  req.end();
};


exports.genBlogdata = function(blog, filename) {
  object = objectPre + filename;
  var data = blog.textcon;
  var path = bcs.gensign(accessKey, secrectKey, 'MBO', 'PUT', bucket, object);
  var opts = {
    host:host,
    path:path.path,
    method:'PUT'
  };
  var req = http.request(opts, function(res) {
    res.on('data', function(chunk){})
  });
  req.setHeader('Content-Type', 'text/plain');
  var buf = new Buffer(data);
  req.setHeader('Content-length', buf.length);
  req.write(data);
  req.end();
};
exports.genCommentdata = function(hash) {
  object = objectPre + 'comments/' + hash + '_comment.json';
  var data = {
    "id": hash,
    "con":[]
  };
  data = JSON.stringify(data);
  var path = bcs.gensign(accessKey, secrectKey, 'MBO', 'PUT', bucket, object);
  var opts = {
    host:host,
    path:path.path,
    method:'PUT'
  };
  var req = http.request(opts, function(res) {
    res.on('data', function(chunk){})
  });
  req.setHeader('Content-Type', 'text/plain');
  var buf = new Buffer(data);
  req.setHeader('Content-length', buf.length);
  req.write(data);
  req.end();
}
exports.updateBlogs = function(blog, hash, fn) {
  exports.getFile('blog.json', function(data) {
    object = objectPre + 'blog.json';
    var blogs = JSON.parse(data.toString());
    var newB = {
      "title":blog.textname,
       "hash":hash,
       "chaiyao":blog.zhaiyao,
       "type":blog.texttype
    };
    blogs.con.unshift(newB);
    blogs = JSON.stringify(blogs);
    var path = bcs.gensign(accessKey,secrectKey,'MBO','PUT',bucket,object);
    var opts = {
      host:host,
      path:path.path,
      method:'PUT'
    };
    var req = http.request(opts, function(res) {
      fn();
      res.on('data', function(chunk) {
      });
    });
    req.setHeader('Content-Type', 'text/plain');
    var buf = new Buffer(blogs);
    req.setHeader('Content-length', buf.length);
    req.write(blogs);
    req.end();
  });
};
exports.updateComment = function(comment, hash, fn) {
  var filename = 'comments/' + hash + '_comment.json';
  var date = new Date();
  exports.getFile(filename, function(data) {
    data = JSON.parse(data);
    var newC = {
      "user":comment.comment_user,
      "comment":comment.comment_con,
      "email":comment.comment_email,
      "weibo":comment.comment_weibo,
      "time":date.toString()
    }
    data.con.unshift(newC);
    data = JSON.stringify(data);
    var path = bcs.gensign(accessKey, secrectKey, 'MBO', 'PUT', bucket, object);
    var opts = {
      host:host,
      path:path.path,
      method:'PUT'
    };
    var req = http.request(opts, function(res) {
      fn();
    });
    req.setHeader('Content-Type', 'text/plain');
    var buf = new Buffer(data);
    req.setHeader('Content-length', buf.length);
    req.write(data);
    req.end();
  });
}
exports.updateIPS = function(ip) {
  exports.getFile('ips.json', function(data) {
    object = objectPre + 'ips.json';
    var ips = data.toString() + ' | ' + ip;
    var path = bcs.gensign(accessKey, secrectKey, 'MBO', 'PUT', bucket,object);
    var opts = {
      host:host,
      path:path.path,
      method:'PUT'
    };
    var req = http.request(opts, function(res) {
      res.on('data', function(chunk) {
        fn();
      });
    });
    req.setHeader('Content-Type', 'text/plain');
    var buf = new Buffer(ips);
    req.setHeader('Content-length', buf.length);
    req.write(ips);
    req.end();
  });
}