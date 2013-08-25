var expect = require('chai').expect;

var parseRequest = require("../lib/request_parser");



describe('Review request parser', function(){
	it("should parse #tag", function(done){
		parseRequest("hey, #watchers, review this commit please", function(err, result){
			expect(err).to.be.null;
			expect(result.tags || []).to.deep.equal(["watchers"]);
			done();
		});
	});
	it('should parse @mentioned users', function(done){
		parseRequest("hey, @friend, review this commit please", function(err, result){
			expect(err).to.be.null;
			expect(result.users || []).to.deep.equal(["friend"]);
			done();
		});
	});
	it('should parse #tag and @mentioned users', function(done){
		parseRequest("hey, #watchers and my @friend, review this commit please", function(err, result){
			expect(err).to.be.null;
			expect(result.users || []).to.deep.equal(["friend"]);
			expect(result.tags || []).to.deep.equal(["watchers"]);
			done();
		});
	});
	it('should parse multiple #tags #tags and multiple @mentioned @mentioned users', function(done){
		parseRequest("@friend, #watchers, and @friend2, review this commit please. also #gurus", function(err, result){
			expect(err).to.be.null;
			expect(result.users || []).to.deep.equal(["friend", "friend2"]);
			expect(result.tags || []).to.deep.equal(["watchers", "gurus"]);
			done();
		});
	});

	it('should parse multiple #tags #tags and multiple @mentioned @mentioned users without dups', function(done){
		parseRequest("@friend, #watchers, and @friend2, review this commit please, @friend2, I love your jacket. #gurus you are awesome. also #gurus", function(err, result){
			expect(err).to.be.null;
			expect(result.users || []).to.deep.equal(["friend", "friend2"]);
			expect(result.tags || []).to.deep.equal(["watchers", "gurus"]);
			done();
		});
	});


	it('should ignore #review #reviewthis and #rv tags', function(done){
		parseRequest("hey, #review #reviewthis this commit please #rv", function(err, users){
			expect(err).to.be.null;
			expect(users.tags || []).to.deep.equal([]);
			done();
		});
	});
});