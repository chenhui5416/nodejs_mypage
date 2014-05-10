/**
 * 百度云存储NODEJS实现
 * @type {[type]}
 */
var crypto = require('crypto');
exports.gensign = function(accessKey, secrectKey, flag, method, bucket, object, time, ip, size) {
	var hash, signature, sign, path;
	var content = flag + '\n'
          + 'Method=' + method + '\n'
          + 'Bucket=' + bucket + '\n'
          + 'Object=' + object + '\n';
    if(time) {
    	content += 'Time=' + time + '\n';
    	if(ip) {
    		content += 'Ip=' + ip + '\n';
    		if(size) {
    			content += 'Size=' + Size + '\n';
    		}
    	}
    }
	hash = crypto.createHmac('sha1', secrectKey).update(content).digest();
	signature = hash.toString('base64');
	signature = encodeURIComponent(signature)
	sign = flag + ':' + accessKey + ':' + signature;
	path = '/' + bucket + object + '?sign=' + sign;
	return {
		sign:sign,
		path:path
	}
}
