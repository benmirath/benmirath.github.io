// var app = app || {};

// app.Router = Backbone.Router.extend({
// 	routes : {
// 		// "": "defaultRoute",
// 		 '' : 'defaultRoute'

// 	},
// 	// initialize: function () {
// 	// 	this.collection = new 
// 	// },
// 	defaultRoute: function () {
// 		console.log("whaaaaa?");
// 	}
// });

// Namespace our flowerApp
var app = app || {};

app.Router = Backbone.Router.extend({

routes :{
	"": "noCopy",
	"heirloomRose" : "heirloomRoseMessage",
	"rainbowRose": "rainbowRoseMessage",
	"redRose" : "redRoseMessage"
},

noCopy: function() {
  $("#copy").html("");
},

heirloomRoseMessage: function() {
  $("#copy").html("Heirloom Roses are great Mother's Day flowers");
},

rainbowRoseMessage: function() {
  $("#copy").html("Choose Rainbow Roses for your wedding");
},

redRoseMessage: function() {
  $("#copy").html("On Valentine's Day, give that special someone Red Roses");
}

});


