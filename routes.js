var NOTIFY_ALL_WATCHERS = true;
var NOTIFY_GROUP_EMAIL = "cr@apportable.com";


module.exports.home = function(req, res) {
}


module.exports.pushWebhook = function(req, res) {
	var repo = req.body.repository.name;
	models.Comments.getNewRequests( function(err, newRequests){
		newRequests.forEach(function(request){
			request.sendNotification();
		})
	});
}
