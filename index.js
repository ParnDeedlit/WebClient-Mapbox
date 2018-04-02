"use strict";
var fs = require('fs');

var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer(); // for parsing multipart/form-data
var app = express();

function corsMiddleware(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
}

function errCallback(err) {
  if (err) {
    console.log(err.message);
  }
}

function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

function styleHandler(req, res) {
  var style = req.params.style;
  var path_front = __dirname + "/data/vectortile/style/";
  var path = path_front + style + ".json";
  var exist = fsExistsSync(path);
  if (exist) {
    console.log("style is exist!");
    var json = fs.readFileSync(path);
    res.end(json);
  } else {
    console.log("style is not exist!");
    res.sendStatus(400);
  }
}

function pbfHandler(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  var x = req.params.x;
  var y = req.params.y;
  var z = req.params.z;
  var source = req.params.source;
  var path_front = __dirname + "/data/vectortile/filebase/";
  var path = path_front + source + "/" + z + "/" + x + "/" + y + ".pbf";
  var exist = fsExistsSync(path);
  if (exist) {
    console.log(z + "/" + x + "/" + y + "pbf is exist!");
    var pbf = fs.readFileSync(path);
    res.end(pbf);
  } else {
    console.log(path + " pbf is not exist!");
    res.end();
    res.sendStatus(200);
  }
}

function spriteHandler(req, res) {
  var file = req.params.file;
  var is_png = false;
  switch (file) {
    case 'sprite.json':
      break;
    case 'sprite.png':
      is_png = true;
      break;
    default:
      res.sendStatus(400);
      return;
  }
  var path_front = __dirname + "/data/vectortile/sprite/";
  var path = path_front + file;
  console.log(path + "sprite is exist!");
  var sprite = fs.readFileSync(path);

  if (is_png) {
    res.set('Content-Type', 'image/png');
  } else {
    res.set('Content-Type', 'application/json');
  }
  res.send(sprite);
}

function glyphsHandler(req, res) {
  var fontstack = req.params.fontstack;
  var range = req.params.range;
  var path =  __dirname + "/data/vectortile/glyphs/fonts.json";
  var exist = fsExistsSync(path);
  if (exist) {
    console.log("fonts.json is exist!");
    var pbf = fs.readFileSync(path);
    res.end(pbf);
  } else {
    console.log("fonts.json is not exist!");
    res.sendStatus(404);
  }
};

function fontsHandler(req, res) {
  var fontstack = req.params.fontstack;
  var range = req.params.range;
  var path_front = __dirname + "/data/vectortile/glyphs/";
  var path = path_front + fontstack + "/" + range + ".pbf";
  var exist = fsExistsSync(path);
  if (exist) {
    console.log(fontstack + "/" + range + ".pbf is exist!");
    var pbf = fs.readFileSync(path);
    res.end(pbf);
  } else {
    console.log(path + "is not exist!");
    res.sendStatus(400);
  }
}

app.use(corsMiddleware);
app.use(bodyParser.json({
  limit: '100mb'
})); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.use('/', express.static('./'));
app.use('/cdn', express.static('./libs'));
app.use('/data', express.static('./data'));
app.use('/demohelp', express.static('./demohelp'));
app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.get('/vectortile/style/:style', styleHandler);
app.get('/vectortile/:source/:z/:y/:x', pbfHandler);
app.get('/vectortile/sprite/:file(sprite.json|sprite.png)', spriteHandler);
app.get('/vectortile/glyphs/{fontstack}/{range}', glyphsHandler);
app.get('/vectortile/glyphs/:fontstack/:range', fontsHandler);


app.listen(8822, function() {
  console.log('Server listening on port 8822!');
});
