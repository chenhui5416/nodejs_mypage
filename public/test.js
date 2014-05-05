function gennav(data,page){
  var innerHTML='',arr = data.con,se = document.getElementById('maincon');
  var start,end;

  start = 6*(page-1);
  end = 6*(page)>arr.length?arr.length:6*(page);
  for(var i=start;i<end;i++){
    var title,zy,hash;
    title=arr[i].title;
    hash = arr[i].hash;
    zy=arr[i].chaiyao;
    innerHTML += '<article class="blognav"><header><a title="'+title+'"href="#/blog/'+hash+'">'+title+'</a></header><div><p>'+zy+'</p></div></article>'
  }
  se.innerHTML = innerHTML;
  alist = se.getElementsByTagName('a');
  genPageList(arr.length,page);
}

function getBlog(hr){
  var xhr = new XMLHttpRequest();
  var html="";
  hr = hr.replace('#/','');
  //todo  考虑怎么搞
  xhr.open('get',hr,true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4&&xhr.status==200){
      var converter = new Showdown.converter();
      html = converter.makeHtml(xhr.responseText);
      var innerHTML = '<article class="blogcon">'+html+'</article>';
      var se = document.getElementById('maincon');
      se.innerHTML = innerHTML;
    }
  }
  xhr.send();

  var xhr1 = new XMLHttpRequest();
  xhr1.open('get','/blog',true);
  xhr1.onreadystatechange = function(){
    if(xhr1.readyState==4&&xhr1.status==200){
      var data = JSON.parse(xhr1.responseText);
      genBlogNav(data,hr);
    }
  } 
  xhr1.send();
  return html;
}

function noHashInit(page){
  var xhr = new XMLHttpRequest();
  xhr.open('get','/blog',true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4&&xhr.status==200){
      var data = JSON.parse(xhr.responseText);
      gennav(data,page); 
    }
  } 
  xhr.send();
}
function genPageList(count,page){
  page = Number(page);    //avoid the page+1 use string add method
  var ulCont = document.getElementById('pagelist'),innerHTML="<li>Pre</li>";
  count = Math.ceil(count/6);
  for(var i=1;i<=count;i++){
    innerHTML+='<li>'+i+'</li>';
  }
  innerHTML+='<li>Next</li>'
  ulCont.innerHTML = innerHTML;
  var liList = ulCont.getElementsByTagName('li');
  liList[page].style.backgroundColor="#06D7FF";
  for(var i=liList.length-2;i>0;i--){
    liList[i].onclick = function(event){
      var p = event.target.innerHTML;
      noHashInit(p);
    }
  }

  liList[0].onclick = function(event){
    var p = page>1?page-1:1;
    noHashInit(p);
  }
  liList[liList.length-1].onclick = function(event){
    var p = page>=liList.length-2?page:page+1;
    noHashInit(p);
  }
}

function genBlogNav(data,hr){
  var ulCont = document.getElementById('pagelist'),innerHTML='';
  var data = data.con;
  var pre={},next={},curr={},hash;
  for(var i=0;i<data.length;i++){
    curr = data[i];
    hash='blog/'+curr.hash;
    if(hash==hr){
      if (i<data.length-1) {
        next.title = data[i+1].title;
        next.hash = data[i+1].hash;
        break;
      }else{
        next={};
      }
    }else{
      pre.title = data[i].title;
      pre.hash = data[i].hash;
    }
  }
  if(pre.title){
    innerHTML+='<li class="pagenav"><a href="#/blog/'+pre.hash+'">'+pre.title+' </a></li>';
  }else{
    innerHTML+='<li class="pagenav"><a href="#/blog/'+curr.hash+'">已经最前</a></li>';
  }
  if(next.title){
    innerHTML+='<li class="pagenav"><a href="#/blog/'+next.hash+'">'+next.title+' </a></li>';
  }else{
    innerHTML+='<li class="pagenav"><a href="#/blog/'+curr.hash+'">已经最后</a></li>';
  }
  ulCont.innerHTML = innerHTML;
}

