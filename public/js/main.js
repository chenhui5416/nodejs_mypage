window.onload = function() {
	var hash = location.hash;
	genAuthodMes();
	if(hash) {
		var blog = getBlog(hash);
	} else {
		gennav(1);
	}
};
window.onhashchange =function() {
	var hash = location.hash;
	var test = hash.replace('#!','');
	if(test != '') {
		var blog = getBlog(hash);
	} else {
		gennav(1);
		clearBlogCommentTemplate();
	}
};
