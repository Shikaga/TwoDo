/**
 * Module dependencies.
 */

var express = require('express')
	, stylus = require('stylus')
	, nib = require('nib')
	, sio = require('socket.io')
	, fs = require('fs');

/**
 * App.
 */

var app = express.createServer();

/**
 * App configuration.
 */

app.configure(function () {
	app.use(stylus.middleware({ src: __dirname + '/public', compile: compile }));
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname);
	app.set('view engine', 'jade');

	function compile (str, path) {
		return stylus(str)
			.set('filename', path)
			.use(nib());
	};
});

/**
 * App routes.
 */

app.get('/', function (req, res) {
	res.render('index', { layout: false });
});

/**
 * App listen.
 */

var port = process.env.PORT || 3000;
app.listen(port, function () {
	var addr = app.address();
	console.log('   app listening on http://' + addr.address + ':' + addr.port);
});

/**
 * Socket.IO server (single process only)
 */

var io = sio.listen(app);

// Set our transports
io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 20);
});

var port = 5000;
if (process.env.PORT) {
	port = Number(process.env.PORT);
}

var lobbies = {};
console.log("Using port: " + port);

io.sockets.on('connection', function (socket) {
	socket.on('chat', function (data) {
		socket.emit("chat", data);
	});
	socket.on('getItemsImage', function(data) {
		var items = lobbies[data.lobbyId];
		socket.emit("itemsImage", {items: items});
	});
	socket.on('addItem', function(data) {
		var items = lobbies[data.lobbyId];
		items[data.id] = data.item;
		socket.broadcast.emit("itemAdded", data);
		socket.emit("itemAdded", data);
	});
	socket.on('itemUpdated', function(data) {
		var items = lobbies[data.lobbyId];
		console.log(items);
		console.log(data);

		items[data.id] = data.item;
		socket.broadcast.emit('itemUpdated', data);
	})
	socket.on('loginTo', function(data) {
		console.log('loginTo', data, lobbies);
		if (lobbies[data.id] !== undefined) {
			console.log("Lobby exists");
		} else {
			console.log("crateing new lobby");
			lobbies[data.id] = {};
		}
	})
});
