var TodoItemHandler = function() {

}

TodoItemHandler.prototype.init = function() {
	this.todoItems = ko.observableArray([]);
	ko.applyBindings(this.todoItems);
	socket.emit("getItemsImage");
}

TodoItemHandler.prototype.addSerializedItems = function(itemSerialArray) {
	for (var itemKey in itemSerialArray.items) {
		var item = itemSerialArray.items[itemKey]
		this.addSerializedItem(itemKey, item);
	}
}

TodoItemHandler.prototype.addSerializedItem = function(id, itemSerial) {
	var item = new TodoItem(this, itemSerial);
	this.todoItems.push(item);
}

TodoItemHandler.prototype.createItem = function() {
	var newItem = new TodoItem(this);
	socket.emit("addItem", {
		"id": newItem.uniqueId,
		item: newItem.serialize()
	});
}

TodoItemHandler.prototype.updatedItem = function(item) {
	socket.emit("itemUpdated", {
		"id": item.uniqueId,
		item: item.serialize()
	})
}

TodoItemHandler.prototype.updateItem = function(id, item) {
	console.log(id,item);
}