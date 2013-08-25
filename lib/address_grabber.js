var request_parser = require("./request_parser")
	, async = require("async");
module.exports = function(user, repo, message, callback) {
	if (!user) {
		callback(new Error("User is not found"));
	}
	console.error(user);
	request_parser(message, function(err, messageRecepients){

		console.error(messageRecepients);
		if (messageRecepients.tags.indexOf("watchers")){
			//todo find watchers
		}
		callback(null, []);

	});
}