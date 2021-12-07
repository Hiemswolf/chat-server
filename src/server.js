const port = process.env.PORT || 3001;
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));



io.on('connection', (socket) => {

	const { id } = socket;
	let name;

	socket.on('chat message', (msg) => {
		io.emit('chat message', {
			content: msg,
			author: {
				id: id,
				name: name
			}
		});
	});

	socket.on('set name', (newName) => {
		name = newName;
	});

});

server.listen(port, () => console.log(`Listening on port ${port}...`));
