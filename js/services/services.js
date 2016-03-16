var app = angular.module('vocabTrainer');

app.factory('Vocab', function () {

    var flashCards = [
        {
            question: 'Bacchanalia',
            answer: 'Drunken celebrations',
            type: 'noun'
        },
        {
            question: 'Nebulous',
            answer: '(of a concept) vague of ill-defined',
            type: 'adjective'
        },
        {
            question: 'Parsimonious',
            answer: 'Very unwilling to spend money or use resources',
            type: 'Adjective'
        },
        {
            question: 'Voracious',
            answer: 'Having a very eager approach to an activity',
            type: 'Adjective'
        },
        {
            question: 'Verdant',
            answer: 'Green with grass or other rich vegetation',
            type: 'Adjective'
        }
    ];

    var Vocab = {
        init: function () {
            this.currentFlashCard = _.first(this.flashCards());
        },
        currentFlashCard: null,
        flashCards: function () {
            return this._flashCards || this.getFlashCards();
        },
        getFlashCards: function () {
            this._flashCards = flashCards;
            return this._flashCards;
        },
        trashFlashCard: function (flashCard) {
            this._flashCards.splice(_.indexOf(this._flashCards, flashCard), 1);
        },
        // grab the next flashCard in the list or wrap around to the start
        nextFlashCard: function () {
            if (_.last(this.flashCards()).question == this.currentFlashCard.question) {
                this.currentFlashCard = _.first(this.flashCards());
            } else {
                var currentIndex = _.indexOf(this.flashCards(), this.currentFlashCard);
                this.currentFlashCard = this.flashCards()[currentIndex + 1];
            }

            return this.currentFlashCard;
        },
        wordByName: function (name) {
            return _.detect(this.flashCards(), function (flashCard) {
                return flashCard.question == name;
            });
        },
        // simply move flashCard to end of the list
        markForLater: function (flashCard) {
            var flashCards = this.flashCards();
            flashCards.splice(_.indexOf(flashCards, flashCard), 1);
            flashCards.push(flashCard);
        },
        // place the flashCard in the middle of the list
        markForSoon: function (flashCard) {
            var flashCards = this.flashCards();
            flashCards.splice(_.indexOf(flashCards, flashCard), 1);
            flashCards.splice(parseInt(flashCards.length / 2), 0, flashCard);
        }
    }

    Vocab.init();

    return Vocab;
});
