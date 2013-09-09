

$(function() {
	if (!document.GITHUB_OAUTH_TOKEN || !document.CRISCO_WEBHOOK_URL) {
		return;
	}

	var github = new Github({
	  token: document.GITHUB_OAUTH_TOKEN,
	  auth: "oauth"
	});
	var user = github.getUser();

	function getRepoWebhookStatus(repoObj, callback) {
		repoObj.listHooks(function(err, hooks){
			if (err||!hooks||hooks.length==0){
				return callback(null, false);
			} 
			for (var i=0;i<hooks.length;i++){
				if (hooks[i].url== document.CRISCO_WEBHOOK_URL)
					return callback(null, true);
			}


			return callback(null, false);
		})
	} 
	function fillReposTemplates(err, repos){
		$.each(repos, function(index, repo) {
			var repoObj = github.getRepo(repo.owner.login, repo.name);
			getRepoWebhookStatus(repoObj, function(err, webhookStatus){
				
				var repoHtml = $(ich.repo(repo));
				var checkboxWebhookQ = 'input[type="checkbox".repo-webhook-button';
				var repoWebhookCheckbox = $(repoHtml, checkboxWebhookQ);
				repoWebhookCheckbox.prop('checked', webhookStatus);
				repoWebhookCheckbox.change(function(event) {
					// var thisCheck = $(this, checkboxWebhookQ);
					// console.error(thisCheck);

					// console.error(thisCheck.prop('checked'));
					// console.error(thisCheck.is(':checked'));

				});	
	  		$('#repos-list').append(repoHtml);

			})
		});

	};

	function getRepos(){
		async.parallel([user.repos, function(callback) {
			user.orgs(function(err, orgs) {
				async.concat(orgs, function(org, callback){
					user.orgRepos(org.login, callback);
				}, callback);

			});
		}], function(err, results) {
			var concatedResults = results[0].concat(results[1]);
			fillReposTemplates(err, concatedResults);
		});
	};
	getRepos();

});
