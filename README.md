[![Build Status](https://travis-ci.org/CocoaPods/Specs.png)](https://travis-ci.org/CocoaPods/Specs)

Crisco
======

Code Reviews hosted In github COmments' COmmits


# Why

If your work in the group of engineers on multiply projects without strict "approval"-style code review process, you might want to have code review system these features:

 - Featherweight, no additional ugly web UIs, just Github comments to commits web page
 - No additional user permission configuration, just Github accounts, restrict access to review system based on Github organisation
 - Choose which commits to revew - no one of your peers is interested in that `.png` file you just fixed!
 - Request review from concrete engineers - you know that **@username** worked on this issue a week ago
 - Request review based on __#tag__ged expertise: your peers who have this expertise are watching these __#tags__
 - Possibility to send all review requests to the maillist
 - Allows both review in Github commit comments web page and as replies to the email
 - Pre-push reviews
 - Do not pollute your commit messages with review requests if you dont want to (you still can)



# Installation

# Usage

## Setup

### Private Heroku installation
	git clone https://github.com/darvin/crisco.git
	cd crisco
	heroku create --app <your crisco heroku appname>
	git push heroku master 
	heroku config:add GITHUB_CLIENT_ID=<your github app client id>
	heroku config:add GITHUB_CLIENT_SECRET=<your github app client secret>
	heroku config:add URL=http://<your crisco heroku appname>.herokuapp.com
	heroku addons:add mongohq:sandbox

Then go to  `http://<your crisco heroku appname>.heroku.com` and authorize it to access your Github profile. Add repos you wish to do code reviews in.

### Public installation

Just go to [Crisco site](http://crisco-review.herokuapp.com) and add repos you wish to do code reviews in.


### Group setup

If you need __crisco__ to send commit requests and commit disscussion into your maillist, set `MAILLIST_EMAIL` enviroment variable:

If you want to restrict access to __crisco__ instance to the members of Github organisation, populate `GITHUB_ORGANIZATION` enviroment variable:

## Requests for review

Commit to your repo. You can indicate that you would like your collegues to review this commit by:

 - putting `#reviewthis` in commit message
 - putting `#reviewthis` in commit comment (on Github) - it is not saved in repo, it does not pollute your repo.

By default (depends on settings, see [Setup]), review request will be sent:

 - To all repo's watchers
 - To people __@mentioned__ in commit request
 - To people who watch __#tagged__ tags in commit request (they can choose to watch tags in crisco's web UI)

## Reviewing

You can review commits by:

 - Adding comments to commit (on Github)
 - Responding to maillist email (If you have maillist setup) - comments appear on Github

# Crisco command-line helper

`crisco` is command line utility to help to interact with __crisco__ review system

## Installation

    npm install -g crisco
    
## Setup

Watch tag 

    crisco watch tagname

Unwatch tag

    crisco unwatch tagname


## Usage

Request review of last commit (its not going to put request into commit message, instead its going put it into commit comment on Github, without polluting of repo):

    crisco req
    
Request review of specific commit:

    crisco req cfc4c7231261498805d4106ef1cc27eca75edeb1

Add custom message:

	crisco req -m "Please review this, I'm not sure. It's about #feature. @username, could you look into that, please?"
    
### Support for pre-push reviews

If last (or requested to review) commit is not pushed to `origin` remote, `crisco` will:

 - Create remote branch `_code_review-{commit branch}-{commit hash}`
 - Push commit to that branch
 - Request review of commit

Once commit is pushed to non-`_code_review` prefixed branch, __crisco__ server-side installation will remove temporary branch.