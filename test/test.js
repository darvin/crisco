describe('Crisco server', function(){
  describe('review request', function(){
    it('should be triggered when user puts #reviewthis in commit message');
    it('should be triggered when user puts #reviewthis in commit comment (on Github) and then webhook triggered');
  });
  describe('review request addressing', function(){
 
    it("should be proper to repo's watchers");
    it('should be proper to person @mentioned at review request');
    it('should be proper to persons who watch #tag');
  });
  describe('review comments', function(){
    it('should be sent when user replies on commit comment (on Github) and then webhook triggered');
    it('should be sent when user replies on review request email');


  });
  describe('Web interface', function(){
  	it('should be able to authorize the client');
    it('should be able to watch/unwatch the tag');
  })

})
