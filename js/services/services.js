angular.module('vocabTrainer')

    .factory('Vocab', function () {

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
        var pool_size = 5;
        var review_interval = 5;

        var Vocab = {
            init: function () {
                this.currentFlashCard = _.first(this.flashCards());
                this.poolSize = pool_size;
                this.reviewIntervall = review_interval;
                this.displayAnswer = false;
            },
            currentFlashCard: null,
            setPoolsize:function(poolSize){
                this.poolSize =  poolSize;
            },
            setReviewIntervall:function(reviewIntervall){
                this.reviewIntervall =  reviewIntervall;
            },
            flashCards: function () {
                return this._flashCards || this.getFlashCards();
            },
            getFlashCards: function () {
                this._flashCards = flashCards;
                return this._flashCards;
            },
            trashFlashCard: function (flashCard) {
                this._flashCards.splice(_.indexOf(this._flashCards, flashCard), 1);
                this.currentFlashCard = _.first(this.flashCards());
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
                flashCards.splice(parseInt(this.poolSize), 0, flashCard);
            },
            markForReview: function (flashCard) {
                var flashCards = this.flashCards();
                var reviewPosition = this.poolSize + this.reviewIntervall;
                flashCards.splice(_.indexOf(flashCards, flashCard), 1);
                flashCards.splice(parseInt(reviewPosition), 0, flashCard);
            },
            checkAnswer:function(userAnswer){
                var flashCard = this.currentFlashCard;
                if (flashCard.answer == userAnswer){
                    this.markAnswerAsCorrect();
                    this.displayAnswer = false;
                }
                if (flashCard.answer != userAnswer){
                    this.displayAnswer = true;
                }
            },
            markAnswerAsCorrect:function(){
                var flashCard = this.currentFlashCard;
                if(flashCard.poolStatus == 1){
                    this.trashFlashCard(flashCard)
                    flashCard.markAsCorrectAnswered();
                }
                if(flashCard.poolStatus == 0){
                    this.markForReview(flashCard)
                    flashCard.markAsCorrectAnswered();
                }
                if(flashCard.poolStatus == -1){
                    this.markForSoon(flashCard)
                    flashCard.markAsCorrectAnswered();
                }

            },
            markAnswerAsWrong:function(){
                var flashCard = this.currentFlashCard;
                    flashCard.markAsWrongAnswered();
                    this.markForSoon(flashCard);
            },
            test:function(){
                return "jo";
            }
        }

        Vocab.init();

        return Vocab;
    });

