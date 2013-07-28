/**
 * Todo Item
 * @return The object containing all the bindings
 */
var TodoItem = function() {
	return {
		description: ko.observable(""),
		descriptionEditable: ko.observable(false),
		editDescription: function() {
			this.descriptionEditable(!this.descriptionEditable());
		},
		comment: ko.observable(""),
		commentEditable: ko.observable(false),
		editComment: function() {
			this.commentEditable(!this.commentEditable());
		},
		complete: ko.observable(false)
	}
};