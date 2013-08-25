var User = require("./models").User
	, addressGrabber = require("./address_grabber")
	, sender = require("./sender")
	, async = require("async");
module.exports.commitPushedResponder = function(payload, callback){
	User.findById(payload.pusher.name, function(err, user){
		if (err) return callback(err);
		async.mapLimit(payload.commits, 5, function(commit, cb){
			addressGrabber(user, payload.repository, commit.message, function(err, receivers){
				if (err) return callback(err);	
				sender.sendRequestForReview(user, receivers, commit.message, commit, function(err){
					cb(err);
				});
			});
		}, function(err, results){
			callback(err);
		})
	});
};

module.exports.commitCommentedResponder = function(payload, callback){
	callback(null);
};
