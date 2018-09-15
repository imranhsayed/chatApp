var express = require( 'express' );
var socket = require( 'socket.io' );

// App setup
var app = express();
var server = app.listen(4000, function () {
	console.log( 'Listening to req on port 4000' );
});

app.use( express.static( 'public' ) );

/**
 * We want socket.io to work on this server.
 * socket.io will be sitting around on the server waiting for some client/browser to make up a connection and set up a
 * websocket between the two
 */
var io = socket( server );

/**
 * This will listen for the event called 'connection', and once the connection is made the function ( second param ) will fire.
 * here socket variable refers to the connection that the socket is making
 * socket.id will contain the id of the socket that is making a connection.
 * socket.on() listens to the event 'chat', when the data is send from the client ( front end ) as message object .
 * This data will be available inside data var.
 * io.sockets() refers to all the sockets connected to the same server via different clients/browser.
 */
io.on( 'connection', function ( socket ) {
	console.log( 'Socket Connection made', socket.id );
	socket.on( 'chat', function ( data ) {
		console.log( data );
		/**
		 * io.sockets refers to all the sockets connected to the same server via different clients/browser.
		 * we are sending the data received from one client back to all the clients which are connected to the same server via their open socket connection.
		 */
		io.sockets.emit( 'chat', data );
	} );

} );
