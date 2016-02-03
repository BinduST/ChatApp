var router = require('./routes.js');
var events = require('events');
var emitter = new events.EventEmitter();

var getHandlers = router.getHandlers;
var postHandlers = router.postHandlers;

var getUrl = function(req){
  if(req.url=='/')
      req.url = '/index.html'
    return 'public'+req.url;
}
emitter.on('next',function(handlers,req,res,next){
  var ph = handlers.shift();
  ph.handler(req,res,next);
})

var matchHandler = function(url){
  return function(ph){
    return url.match(new RegExp(ph.path));
  }
}

var methodNotAllowed = function(req,res){
  res.statusCode = 405;
  res.end('Not Allowed');
}

var handleGet = function(req,res){
  req.url = getUrl(req);
  console.log(req.url);
  var handlers = getHandlers.filter(matchHandler(req.url));
  console.log(handlers.map(function(ph){
    return ph.path;
  }));
  console.log(handlers);
  var next = function(){
    emitter.emit('next',handlers,req,res,next);
  }
  next();
}

var handlePost = function(req,res){
  var handlers = postHandlers.filter(matchHandler(req.url));
  console.log(handlers.map(function(ph){
    return ph.path;
  }));
  console.log(handlers);
  var next = function(){
    emitter.emit('next',handlers,req,res,next);
  }
  next();
}
var requestListener = function (req,res) {
  console.log("===========",req.method,"======",req.url,"=========");
  if (req.method == 'GET')
    handleGet(req,res);
  else if (req.method == 'POST')
    handlePost(req,res);
  else
    methodNotAllowed(req,res);
}

var http = require('http');
var server = http.createServer(requestListener);
server.listen(4000);