/**
 * BCS签名算法的测试文件，使用BCF提供restfulAPI
 * 根据百度云存储要求，输入对应的秘钥公钥标志等
 * http://developer.baidu.com/wiki/index.php?title=docs/cplat/bcs/access/signed-url
 * @type {[type]}
 */
var http = require('http');
var bcs = require('./mymodule/bcs_data');
var mpath = bcs.gensign(accessKey,secrectKey,flag,method,bucket,object,time,ip,size);
mpath = mpath.path;
var opts={
	host:"bcs.duapp.com",
	path: mpath,
	method:'get'
};
var req = http.request(opts,function(res){
	res.on('data',function(data){
		console.log(data.toString());
	});
});
req.end();
