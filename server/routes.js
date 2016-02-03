var fs = require('fs');

var serveIndexFile = function (req,res,next) {
	console.log(req.url,"=======url==========");
	fs.readFile(req.url,function(err,data){
		if(data){
			res.statusCode = 200;
			res.end(data);
		}
		else{
			next();
		}
	});
};

var renderChatPage = function(req,res){
	
}

var fileNotFound = function(req, res){
	res.statusCode = 404;
	res.end('Not Found');
	console.log(res.statusCode);
};

exports.getHandlers = [
	{path:'/',handler: serveIndexFile},
	{path:'',handler: fileNotFound}
];

exports.postHandlers = [
	{path:'/chatPage',handler: renderChatPage},
	{path:'',handler: fileNotFound}
];
