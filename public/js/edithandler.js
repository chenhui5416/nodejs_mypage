(function(){
	addImageHandler();
})();
function getblogs(fn){
	var xhr = new XMLHttpRequest();
	xhr.open('get','/blog',true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			var data = JSON.parse(xhr.responseText);
			fn(data)
		}
	}
	xhr.send();
}

function genTitle(data){
	var con = document.getElementById('prelist');
	data = data.con;
	var innerHTML = '<ul>';
	for(var i=0;i<data.length;i++){
		innerHTML+='<li id="bloglistitem_'+i+'">'+data[i].title+'</li>';
	}
	innerHTML+='</ul>';
	con.innerHTML = innerHTML;
	con.addEventListener('click',conHandler);
}
getblogs(genTitle);
function conHandler(event){
	console.log(event.target.id)
}

function addImageHandler() {
	var imageform = document.getElementById('imageform');
	imageform.onsubmit = function(e){
		var temp = new FormData(imageform);
		e.preventDefault();
		ajax('post', '/image', true, function(data){
			alert(data);
			if (data == 'ok') {
				var imageInput = document.getElementById('imageinput');
				imageInput.value = '';
			}
		}, temp, false, true);
	}
}

function ajax(method, url, async, callback, temp, form, image) {
  var xhr = new XMLHttpRequest();
  xhr.open(method,url,async);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    }
  };
  if (form) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  xhr.send(temp);
}

