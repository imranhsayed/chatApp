// Make connection
var socket = io.connect( 'http://localhost:4000' );

var messageEl = document.getElementById( 'message' ),
	userNameEl = document.getElementById( 'user-name' ),
	chatForm = document.getElementById( 'chat-form' ),
	outputEl = document.getElementById( 'output' ),
	feedbackEl = document.getElementById( 'feedback' );

/**
 * The socket.emit() will emit a message( data passed as a obj in second param of socket.emit())
 * down the socket to the server , server will then transmit the message to all the other clients that are
 * listening to this server which are connected via their individual sockets.
 * 'chat' is the name of the chat
 * and second param is the object containing message and handle.
 */
chatForm.addEventListener( 'submit', function () {
	event.preventDefault();
	socket.emit( 'chat', {
		message: messageEl.value,
		userName: userNameEl.value
	} );

	// Clear the chat message input element.
	messageEl.value = "";
	feedbackEl.innerHTML = '';
} );

// Add an event for displaying the user is typing even he is pressing buttons in the message input element.
messageEl.addEventListener( 'keypress', function () {
	socket.emit( 'typing', userNameEl.value )
} );

// Listen for events.
socket.on('chat', function(data){

	outputEl.innerHTML += '<p><strong>' + data.userName + ': </strong>' + data.message + '</p>';
	// When the message is sent then set the typing message to empty.
	feedbackEl.innerHTML = '';
});

socket.on( 'typing', function ( data ) {
	feedbackEl.innerHTML = '';
	feedbackEl.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>';
} );

