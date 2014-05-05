window.onload = function(){
	var hash = location.hash;
	if(hash){
		var blog = getBlog(hash);
	}else{
		noHashInit(1);
	}
};
window.onhashchange =function(){
	var hash = location.hash;
	var test = hash.replace('#','');
	if(test!=''){
		var blog = getBlog(hash);
	}else{
		console.log(hash);
		noHashInit(1);
	}
};
