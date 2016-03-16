describe('Vocab Factory', function() {

  beforeEach(module('vocabTrainer'));

  var Vocab;

  beforeEach(inject(function($injector) {
    Vocab = $injector.get('Vocab');
    Vocab._flashCards = [
      { question: 'Banana' },
      { question: 'Apple' },
      { question: 'Plum' },
      { question: 'Grape', answer: 'A berry growing in clusters on a grapevine' },
      { question: 'Orange' },
      { question: 'Pear' }
    ];
  }));

  describe('nextFlashCard', function() {
    it('should retrieve the next flasCard in the list', function() {
      Vocab.currentFlashCard = Vocab.wordByName('Plum');
      expect(Vocab.nextFlashCard().question).toEqual('Grape');
    });

    it('should return to the start of the list once the end is reached', function() {
      Vocab.currentFlashCard = Vocab.wordByName('Pear');
      expect(Vocab.nextFlashCard().question).toEqual('Banana');
    });
  });

  describe('markForLater', function() {
    it('should place the flashCard to the back of the flashCard list', function() {
      Vocab.markForLater(Vocab.flashCards()[0]);
      expect(_.last(Vocab.flashCards())).toEqual({ question: 'Banana' });
    });
  });

  describe('markForSoon', function() {
    it('should place the flashCard to the middle of the flashCard list', function() {
      Vocab.markForSoon(Vocab.flashCards()[0]);
      expect(Vocab.flashCards()[2]).toEqual({ question: 'Banana' });
    });
  });

  describe('wordByName', function() {
    it('retrieve the FlashCard object for a given flashCard', function() {
      expect(Vocab.wordByName('Grape').answer).toEqual('A berry growing in clusters on a grapevine');
    });
  });

  describe('trashFlashCard', function() {
    it('remove a FlashCard object from the flashCards list', function() {
      var flashCard = Vocab.wordByName('Apple');
      Vocab.trashFlashCard(flashCard);
      expect(Vocab.wordByName('Apple')).toEqual(undefined);
    });
  });

});
