/**
 * ajax get data
 */
function ajax(method, url, async, callback, str, form) {
  var xhr = new XMLHttpRequest();
  xhr.open(method,url,async);
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    }
  };
  if (form) {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  };
  xhr.send(str);
}

function genAuthodMes() {
  ajax('get', '/author', true, function(data) {
    authorTemplate(data);
  });
}

function gennav(page) {
  ajax('get', '/blog', true, function(data) {
    blognavTemplate(data, page);
    blogNavClassifyTemplate(data)
  });
}

function getBlog(hr) {
  var html = "";
  var neg = /blog\/([0-9]*)(\/s|\/|$)/;
  var res = neg.exec(hr);
  ajax('get', res[0], true, function(data) {
    blogTemplate(data);
  });
  ajax('get', '/blog', true, function(data) {
      data = JSON.parse(data);
      genBlogNav(data,res[0]);
  });
  ajax('get', '/comments/'+res[1],true , function(data) {
    genBlogCommentTemplate(data);
  });
  return html;
}
/**
 * template defined
 */
function authorTemplate(data) {
  var se, innerHTML;
  data = JSON.parse(data);
  se = document.getElementById('author');
  innerHTML = '<ul>';
  for(var tag in data) {
    innerHTML += '<li>' + tag + ':' + data[tag] + '</li>';
  }
  innerHTML += '</ul>';
  se.innerHTML = innerHTML;
}

function blognavTemplate(data, page) {
  data = JSON.parse(data);
  var innerHTML ='',arr = data.con,se = document.getElementById('maincon');
  var start,end;
  start = 6 * (page - 1);
  end = 6 * (page) > arr.length ? arr.length : 6 * (page);
  for(var i = start; i < end; i++) {
    var title, zy, hash;
    title = arr[i].title;
    hash = arr[i].hash;
    zy = arr[i].chaiyao;
    var time = new Date(arr[i].hash);
    time = time.toLocaleDateString();

    innerHTML += '<article class="blognav">' +
    '<header><a title="' + title + '"href="#!/blog/' +
    hash + '">' + title + '</a></header><div><p>' + zy +
    '</p></div><div class="blognav_bottom"><span>' + time + 
    '</span> <span><a title="'+ title +'"href="#!/blog/' +
    hash + '">阅读</a></span></div></article>'
  }
  se.innerHTML = innerHTML;
  alist = se.getElementsByTagName('a');
  genPageList(arr.length, page);
}

function blogTemplate(data) {
  var converter = new Showdown.converter();
  html = converter.makeHtml(data);
  var innerHTML = '<article class="blogcon">'+ html +'</article>';
  var se = document.getElementById('maincon');
  se.innerHTML = innerHTML;
}

function genPageList(count, page) {
  page = Number(page);    //avoid the page+1 use string add method
  var ulCont = document.getElementById('pagelist'), innerHTML = "<li>Pre</li>";
  count = Math.ceil(count/6);
  for(var i = 1; i <= count; i ++) {
    innerHTML += '<li>' + i + '</li>';
  }
  innerHTML += '<li>Next</li>'
  ulCont.innerHTML = innerHTML;
  var liList = ulCont.getElementsByTagName('li');
  liList[page].style.backgroundColor = "#06D7FF";
  for(var i=liList.length-2; i>0; i--) {
    liList[i].onclick = function(event) {
      var p = event.target.innerHTML;
      // noHashInit(p);
      gennav(p);

    }
  }
  liList[0].onclick = function(event) {
    var p = page > 1 ? page - 1 : 1;
      // noHashInit(p);
      gennav(p);
  }
  liList[liList.length - 1].onclick = function(event) {
    var p = page >= liList.length-2 ? page : page + 1;
      // noHashInit(p);
      gennav(p);
  }
}
function genBlogNav(data, hr) {
  var ulCont = document.getElementById('pagelist'),innerHTML = '';
  var data = data.con;
  var pre = {}, next = {}, curr = {}, hash;
  for(var i=0; i < data.length; i++) {
    curr = data[i];
    hash = 'blog/' + curr.hash;
    if(hash == hr) {
      if (i < data.length - 1) {
        next.title = data[i + 1].title;
        next.hash = data[i + 1].hash;
        break;
      } else {
        next = {};
      }
    } else {
      pre.title = data[i].title;
      pre.hash = data[i].hash;
    }
  }
  if(pre.title) {
    innerHTML += '<li class="pagenav"><a href="#!/blog/' + pre.hash + '">' + pre.title + ' </a></li>';
  } else {
    innerHTML += '<li class="pagenav"><a href="#!/blog/' + curr.hash + '">已经最前</a></li>';
  }
  if(next.title) {
    innerHTML += '<li class="pagenav"><a href="#!/blog/' + next.hash + '">' + next.title+ ' </a></li>';
  } else {
    innerHTML += '<li class="pagenav"><a href="#!/blog/' + curr.hash+ '">已经最后</a></li>';
  }
  ulCont.innerHTML = innerHTML;
}
function blogNavClassifyTemplate(data) {
  var blogclassify = document.getElementById('blogclassify'), types = {}, listHtml;
  var innerHTML = '<header>文章分类</header>'
  data = JSON.parse(data);
  data = data.con;
  for(var i = 0; i < data.length; i++) {
    var temp = data[i];
    var type = temp.type;
    if(type in types) {
      types[type].push(temp);
    } else {
      types[type] = new Array();
      types[type].push(temp);
    }
  }
  console.log(types);
  listHtml = genBlogNavClassifyTemplate(types);
  innerHTML += listHtml;
  blogclassify.innerHTML = innerHTML;
}
function genBlogNavClassifyTemplate(data) {
  var otHtml = '', inHtml; 
  for(var key in data) {
    inHtml = '<nav class="blog_classify_nav"><header>' + key + 
    '</header><ul>';
    var listData = data[key];
    for(var i = 0; i < listData.length; i++) {
      inHtml += '<li><a href="#!/blog/'+ listData[i].hash +'">' +
       listData[i].title + '</a></li>';
    }
    inHtml += '</ul></nav>'
    otHtml += inHtml;
  }
  return otHtml;
}
function genBlogCommentTemplate(data) {
  data = JSON.parse(data);
  console.log(data);
  var blogId, blogCon, formHtml, ulHtml, innerHTML, se;
  se = document.getElementById('comments');
  blogId = data.id;
  blogCon = data.con;
  ulHtml = '<ul>'
  for(var i = 0; i < blogCon.length; i++) {
    var time = new Date(blogCon[i].time);
    ulHtml += '<li><div class="comment_user">' + blogCon[i].user + 
              '<a target="_blank" title="查看评论者微博" href="' + blogCon[i].weibo + '">'+
              '<img src="./img/weibo_logo.png">'+
              '</a></div>' +
              '<div class="comment_con">' + blogCon[i].comment + '</div>' +
              ' <div class="comment_footer">' + time.toLocaleDateString() + 
              '<a onclick="refCommentHandler(\''+blogCon[i].user+'\')">回复</a></div>'
  }
  ulHtml += '</ul>';

  formHtml = '<form class="comments_form" method="post" action="/comments/'+ blogId +'" onsubmit="commentHandler(event)">' +
             '<textarea id="comment_con" name="comment_con"></textarea>' +
             '<input placeholder="昵称(必填)" type="text" name="comment_user" required>' +
             '<input placeholder="邮箱(必填)" type="email" name="comment_email" required>' +
             '<input placeholder="微博(互粉呀！)" type="text" name="comment_weibo" value="http://">' +
             '<input class="btn comments_form_btn" type="submit">' +
             '</form>'
  innerHTML = ulHtml + formHtml+'<div style="padding-bottom:20px"></div>';//FIXED
  se.innerHTML = innerHTML;
}
function clearBlogCommentTemplate() {
  var se = document.getElementById('comments');
  se.innerHTML = "";
}
function commentHandler(event) {
  event.preventDefault();
  var target = event.target;
  var url = target.action;
  var reg = /\/([0-9]*)(\/s|\\|$)/;
  var res = reg.exec(url);
  console.log(res);
  var postStr = 'comment_user=' + target.comment_user.value + 
                '&comment_email=' + target.comment_email.value + 
                '&comment_weibo=' + target.comment_weibo.value +
                '&comment_con=' + target.comment_con.value;
  console.log(url);
  ajax('post', url, true, function(data){
    if(data == "ok") {
      ajax('get', '/comments/'+res[1],true , function(data) {
        genBlogCommentTemplate(data);
      });
    }
  }, postStr, true);

}

function refCommentHandler(ref) {
  var comment_con = document.getElementById('comment_con');
  comment_con.value = "@ " + ref + " :"; 
  comment_con.focus();
  comment_con.select();
}