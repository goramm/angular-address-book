var express = require('express'),
api					= require('./api');
app 				= express();

app
	.use(express.static('./'))
	.use('/api', api)
	.get('*', function(req, res){
		res.sendFile(__dirname + '/main.html');
	}).listen(3000);