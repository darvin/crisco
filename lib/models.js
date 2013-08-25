var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  _id: String,
  email: String,
  token: String,
  displayName: String,
  username: String,
  profile: Schema.Types.Mixed
});


UserSchema.statics.loginUser = function (accessToken, profile, cb) {
  this.findByIdAndUpdate(profile.username, 
  	{$set: 
  		{
  			profile:profile, 
  			email:profile.emails[0].value,
  			token:accessToken,
        username:profile.username,
        displayName:profile.displayName
  		}}, {upsert:true}, function(err, user){
  			cb(err, user);
  		});
}


module.exports.User = mongoose.model('User', UserSchema);
