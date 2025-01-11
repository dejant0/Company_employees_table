var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: false },
	website: { type: String, required: false },
	address: {
	  street: { type: String, required: false },
	  suite: { type: String, required: false },
	  city: { type: String, required: false },
	  zipcode: { type: String, required: false },
	  geo: {
		lat: { type: Number, required: false },
		lng: { type: Number, required: false }
	  }
	},
	company: {
	  name: { type: String, required: false },
	  catchPhrase: { type: String, required: false },
	  bs: { type: String, required: false }
	}
  });


var User = mongoose.model('user', userSchema);
module.exports = User;
