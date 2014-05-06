var fs = require('fs');
exports.getBlogs = function(fn){
  fs.readFile('jsons/blog.json',function(err,data){
    if(err) throw err;
    if(fn){
 	  fn(data.toString());
    }
  });
};
exports.getBlogFiles = function(blogUrl,fn){
  fs.readFile(blogUrl,function(err,data){
    if(err) throw err;
    fn(data.toString());
  });
};
exports.genBlogdata = function(blog,filename){

  fs.open(filename, 'w+',function(err,fd){
  	fs.write(fd,blog.textcon,0,'utf8',function(err){
  	  if(err) throw err;
  	  fs.close(fd);
  	});
  });
};
exports.updateBlogs = function(blog,hash,fn){
  fs.readFile('jsons/blog.json',function(err,data){
  	var blogs = JSON.parse(data.toString());
  	var newB = {
  	  "title":blog.textname,
      "hash":hash,
      "chaiyao":blog.zhaiyao,
      "type":blog.texttype
  	}
  	blogs.con.unshift(newB);
  	blogs = JSON.stringify(blogs);
  	fs.writeFile('jsons/blog.json',blogs,'utf8',function(err){
  		fn();
  	})
  });
};
