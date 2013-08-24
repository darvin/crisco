describe('Crisco server', function(){
  describe('review requests', function(){
    it('should be sent when user puts #reviewthis in commit message');
    it('should be sent when user puts #reviewthis in commit comment (on Github) and then webhook triggered');
    it("should be sent to repo's watchers");
    it('should be sent to person @mentioned at review request');
    it('should be sent to persons who watch #tag');
  });
  describe('review comments', function(){
    it('should be sent when user replies on commit comment (on Github) and then webhook triggered');
    it('should be sent when user replies on review request email');


  })
})
