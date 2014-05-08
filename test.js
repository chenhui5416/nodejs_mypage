function F() {
    var f = [];
    for (var i = 0; i <= 2; i++) {
        f[i] = function() {
          var te = i;
          return function(){
            console.log(te)
          }
        }()
    };
    return f;
}

var f = F();

for (var i = 0; i < f.length; i++) {
    f[i]();
};

function F() {
    var f = [];
    for (var i = 0; i <= 2; i++) {
       f[i] = function() {
          var te = i;
          return function(){
            console.log(te)
          }
        }()
    };
    return f;
}

