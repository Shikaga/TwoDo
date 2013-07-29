var TodoItemHandler = function() {

}

TodoItemHandler.prototype.init = function() {
	this.todoItems = ko.observableArray([]);
	ko.applyBindings(this.todoItems);
	socket.emit("getItemsImage");
}

TodoItemHandler.prototype.addSerializedItems = function(itemSerialArray) {
	for (var itemSerial in itemSerialArray.items) {
		this.addSerializedItem(itemSerial);
	}
}

TodoItemHandler.prototype.addSerializedItem = function(itemSerial) {
	var item = new TodoItem(itemSerial);
	this.todoItems.push(item);
}

TodoItemHandler.prototype.createItem = function() {
	var newItem = new TodoItem();
	socket.emit("addItem", newItem.serialize());
}