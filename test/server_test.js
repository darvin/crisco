var app = require("../")
var request = require('supertest');

describe('Crisco server', function(){
  describe('review request', function(){

    it('should be triggered when user puts review in commit message', function(done){
      var fixture = require("./fixtures/push_webhook_payload");
      request(app)
        .post('/webhook')
        .send(fixture)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res, body){
          console.error(res.ok, res.body);
          if (err) return done(err);
          done()
        });
    });
    it('should be triggered when user puts review in commit comment');
    it('should be triggered when user puts review in pull request');

  });

  describe('review comments', function(){
    it('should be sent when user replies on commit comment (on Github) and then webhook triggered');
    it('should be sent when user replies on review request email');

  });
  describe('Web interface', function(){
  	it('should be able to authorize the client');
    it('should be able to watch/unwatch the tag');
  })

});



