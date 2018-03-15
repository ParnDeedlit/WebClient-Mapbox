(function () {
  var r = new RegExp("(^|(.*?\\/))(include-mapboxgl\.js)(\\?|$)"),
      s = document.getElementsByTagName('script'), targetScript;
  for (var i = 0; i < s.length; i++) {
    var src = s[i].getAttribute('src');
    if (src) {
      var m = src.match(r);
      if (m) {
        targetScript = s[i];
        break;
      }
    }
  }

  function inputScript(url) {
    var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
    document.writeln(script);
  }

  function inputCSS(url) {
    var css = '<link rel="stylesheet" href="' + url + '">';
    document.writeln(css);
  }

  function inArray(arr, item) {
    for (i in arr) {
      if (arr[i] == item) {
        return true;
      }
    }
    return false;
  }

  //comman leaflet librarys
  function load() {
    var onInternetMode = true;
    var ip = targetScript.getAttribute('ip');
    var socket = targetScript.getAttribute('socket');

    var includes = (targetScript.getAttribute('include') || "").split(",");
    var excludes = (targetScript.getAttribute('exclude') || "").split(",");

    var httpUrl = "";

    if(ip && socket){
      onInternetMode = false;//区域网模式
    }else{//互联网模式
      onInternetMode = true;
    }

    if(onInternetMode){
      httpUrl = "http://182.61.52.190:8800";//"http://www.smaryun.com";
    }else{
      httpUrl = "http://" + ip + ":" + socket + "";
    }

    if (!inArray(excludes, 'mapboxgl')) {
      inputCSS(httpUrl + "/cdn/mapboxgl/mapbox-gl.css");
      inputScript(httpUrl + "/cdn/mapboxgl/mapbox-gl.js");
    }
    // if (!inArray(includes, 'wmts')) {
    //    inputScript("http://" + ip + ":" + socket + "/cdn/leaflet plugins/leaflet-tilelayer-wmts.js");
    // }
    // if (inArray(includes, 'turf')) {
    //    inputScript("http://" + ip + ":" + socket + "/cdn/turf/turf.min.js");
    // }
    // if (inArray(includes, 'mapv')) {
    //    inputScript("http://" + ip + ":" + socket + "/cdn/mapv/mapv.min.js");
    // }
    // if (inArray(includes, 'echarts')) {
    //    inputScript("http://" + ip + ":" + socket + "/cdn/echarts/echarts.js");
    // }
    if (inArray(includes, 'elasticsearch')) {
       inputScript(httpUrl + "/cdn/elasticsearch/14.1.0/elasticsearch.min.js");
    }
  }

  load();
  window.isLocal = false;
  window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8800" : 'http://' + document.location.host;
})();
