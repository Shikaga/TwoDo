var socket = io.connect(window.location.href);
socket.on('chat', function (data) {
	console.log(data);
	var label = document.getElementById("textLabel");
	label.innerHTML = data.text;
});

function setText() {
	var value = document.getElementById("textBox").value;
	socket.emit("chat", {text: value});
}

todoItems = ko.observableArray([new TodoItem(), new TodoItem()]);
ko.applyBindings(todoItems);