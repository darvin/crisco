describe('Crisco server', function(){
  describe('review request', function(){
    it('should be triggered when user puts review in commit message');
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



