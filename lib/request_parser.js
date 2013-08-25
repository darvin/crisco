var _ = require("lodash");


var TAGS_RE =/#(\w+)/gi;
var	USERS_RE =/@(\w+)/gi;

var IGNORED_TAGS_RE = /review|rv/

function getMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}

module.exports = function(requestMessage, callback) {
	var result = {};

	var tagsMatch = getMatches(requestMessage, TAGS_RE, 0);
	tagsMatch = tagsMatch.filter(function(item){
		return ! item.match(IGNORED_TAGS_RE);
	});
	result.tags = _.unique(tagsMatch);

	var usersMatch = getMatches(requestMessage, USERS_RE, 0);
	result.users = _.unique(usersMatch);

	callback(null, result);
};