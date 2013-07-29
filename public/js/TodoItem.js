/**
 * Todo Item
 * @return The object containing all the bindings
 */
var TodoItem = function(itemSerial) {
	var item =  {
		description: ko.observable(""),
		descriptionEditable: ko.observable(false),
		editDescription: function() {
			this.descriptionEditable(!this.descriptionEditable());
		},
		descriptionChanged: function(e) {
			console.log(this.description());
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
				description: this.description(),
				descriptionEditable: this.descriptionEditable(),
				comment: this.comment(),
				commentEditable: this.commentEditable(),
				complete: this.complete()
			}
		}
	}
	if (itemSerial !== undefined) {
		console.log('ItemSerial');
	}
	return item;
};