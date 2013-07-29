var socket = io.connect(window.location.href);
socket.on('chat', function (data) {
	console.log(data);
	var label = document.getElementById("textLabel");
	label.innerHTML = data.text;
});

socket.on('itemsImage', function(data) {
	console.log('itemsImage', data);
	todoItemHandler.addSerializedItems(data);
})

socket.on('itemAdded', function(data) {
	console.log('itemAdded', data);
	todoItemHandler.addSerializedItem(data.id, data.item);
})


socket.on('itemUpdated', function(data) {
	console.log('itemUpdated', data);
	todoItemHandler.updateItem(data.id, data.item);
})

function setText() {
	var value = document.getElementById("textBox").value;
	socket.emit("chat", {text: value});
}

function getRandomString() {
	return Math.random().toString().substr(2);
}