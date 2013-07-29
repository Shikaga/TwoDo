/**
 * Todo Item
 * @return The object containing all the bindings
 */
var TodoItem = function(handler, itemSerial) {
	var randomString = getRandomString();
	var item =  {
		handler: handler,
		uniqueId: randomString,
		description: ko.observable(""),
		descriptionEditable: ko.observable(false),
		editDescription: function() {
			this.descriptionEditable(!this.descriptionEditable());
		},
		changed: function(e) {
			console.log(this.description());
			handler.updatedItem(this);
			return true;
		},
		comment: ko.observable(""),
		commentEditable: ko.observable(false),
		editComment: function() {
			this.commentEditable(!this.commentEditable());
		},
		complete: ko.observable(false),
		serialize: function() {
			return {
				uniqueId: this.uniqueId,
				description: this.description(),
				comment: this.comment(),
				complete: this.complete()
			}
		},
		update: function(updatedItem) {
			this.description(updatedItem.description);
			this.comment(updatedItem.comment);
			this.complete(updatedItem.complete);
		}
	}
	if (itemSerial !== undefined) {
		item.uniqueId = itemSerial.uniqueId;
		item.description(itemSerial.description);
		item.comment(itemSerial.comment);
		item.complete(itemSerial.complete);
	}
	return item;
};