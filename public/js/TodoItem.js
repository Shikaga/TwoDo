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
		descriptionChanged: function(e) {
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
				//descriptionEditable: this.descriptionEditable(),
				comment: this.comment(),
				//commentEditable: this.commentEditable(),
				complete: this.complete()
			}
		}
	}
	if (itemSerial !== undefined) {
		item.uniqueId = itemSerial.uniqueId;
		item.description(itemSerial.description);
		//this.descriptionEditable(),
		item.comment(itemSerial.comment);
		//this.commentEditable(),
		item.complete(itemSerial.complete);
	}
	return item;
};