var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  _id: String,
  email: String,
  token: String,
  profile: Schema.Types.Mixed
});


UserSchema.statics.loginUser = function (accessToken, profile, cb) {
  this.findByIdAndUpdate(profile.username, 
  	{$set: 
  		{
  			profile:profile, 
  			email:profile.emails[0].value,
  			token:accessToken
  		}}, {upsert:true}, function(err, user){
  			console.error(user);
  			cb(err, user);
  		});
}


module.exports.User = mongoose.model('User', UserSchema);
