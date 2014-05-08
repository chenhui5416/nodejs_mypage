function indexOf( str, tar) { 
  if( tar.length > str.length) return -1;
  var j = 0,i = 0;
  for ( i; i<str.length; i++){
    if ( str[i] == tar[j]){
      j++;
      if ( j == tar.length){
        return (i-j+1) ;
      } 
    } else {
      i = i-j;
      j = 0;
    }
  }
  return -1;
 }
 var aa = indexOf('abcd', 'cd');
 console.log(aa)
