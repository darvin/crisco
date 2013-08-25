var responders = require('./request_responder');
var NOTIFY_ALL_WATCHERS = true;
var NOTIFY_GROUP_EMAIL = "cr@apportable.com";


module.exports.home = function(req, res) {
	res.render('index',{ 
		title: 'Home' 
	});

}


module.exports.webhook = function(req, res) {
	// var repo = req.body.repository.name;
	// models.Comments.getNewRequests( function(err, newRequests){
	// 	newRequests.forEach(function(request){
	// 		request.sendNotification();
	// 	})
	// });
	switch(req.body.event){
		case "push":
			responders.commitPushedResponder(req.body.payload, function(err, result){
				res.json({});
			});
			break;
		default:
			res.error(404);
			break;
	}
}
