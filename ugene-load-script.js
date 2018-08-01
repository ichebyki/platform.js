function loadUgeneScript(url, args, callback){

  var script = document.createElement("script")
  script.type = "text/javascript";
  script.attributes["lang"] = args;

  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
        script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  /*document.getElementsByTagName("head")[0].appendChild(script);*/
  document.head.appendChild(script);
}
