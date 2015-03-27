if (Meteor.isClient) {
  Template.notFound.helpers({
    gifs: function() {
		return Gifs();
    }
  });
}

