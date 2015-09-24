console.log("tape_view.js linked");

// function TapeView(model){
//   this.$el   = $("<li>");
//   this.model = model;
// }

// TapeView.prototype = {
//   template: _.template($("#tape-template").html()),

//   render: function() {
//     console.log('view render', this);
//     var temp = this.template({tape: this.model});
//     this.$el = $(temp); // reset el

//     return this; // for chaining!
//   },

//   init: function() {
//     console.log('view init', this);
//     var view = this;
//     view.render();
//     $("#tapes").append(view.$el);
//     return this;
//   },

//   chooseTape: function(event) {
//     console.log(event.data);
//     event.data.$el.find("span.name")
//     event.data.model.updateColor();
//   },

//   remove: function(event) {
//     console.log('view remove', event.data);

//     event.data.$el.remove();
//     todoApp.taskViews[event.data.viewId] = null; // remove from global list!
//     event.data.model.destroy();
//   }
// }

