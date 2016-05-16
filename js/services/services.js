angular.module('vocabTrainer')

    .factory('Vocab', function () {

        var dbFlashCards = [
            {
                question: 'one',
                answer: 'eins',
                type: 'noun'
            },
            {
                question: 'two',
                answer: 'zwei',
                type: 'adjective'
            },
            {
                question: 'three',
                answer: 'drei',
                type: 'Adjective'
            },
            {
                question: 'four',
                answer: 'vier',
                type: 'Adjective'
            },
            {
                question: 'a',
                answer: 'a',
                type: 'Adjective'
            },
            {
                question: 'a',
                answer: 'a',
                type: 'Adjective'
            },
            {
                question: 'b',
                answer: 'b',
                type: 'Adjective'
            },
            {
                question: 'c',
                answer: 'c',
                type: 'Adjective'
            },
        ];
        var flashCards = new Array();
        for (var i = 0; i < dbFlashCards.length; i++) {
            var obj = new ClassFlashCard(dbFlashCards[i]);
            flashCards.push(obj);
        }
        var pool_size = 5;
        var review_interval = 5;

        function Vocab() {
            this.iniTrainer = function (){
                this.currentFlashCard = _.first(this.flashCards());
                this.poolSize = pool_size;
                this.reviewIntervall = review_interval;
                this.displayAnswer = false;
            };

            this.currentFlashCard = null;
            this.sortByImportance = function (a, b) {
                return parseFloat(b.importance) - parseFloat(a.importance);
            }
            this.flashCards = function () {
                return this._flashCards || this.getFlashCards();
            };
            this.getFlashCards = function () {
                this._flashCards = flashCards;
                return this._flashCards;
            };
            // grab the next flashCard in the list or wrap around to the start
            this.nextFlashCard = function () {
                if (_.last(this.flashCards()).question == this.currentFlashCard.question) {
                    this.currentFlashCard = _.first(this.flashCards());
                } else {
                    var currentIndex = _.indexOf(this.flashCards(), this.currentFlashCard);
                    this.currentFlashCard = this.flashCards()[currentIndex + 1];
                }

                return this.currentFlashCard;
            };
            this.wordByName = function (name) {
                return _.detect(this.flashCards(), function (flashCard) {
                    return flashCard.question == name;
                });
            };
            this.trashFlashCard = function () {
                var flashCard = this.currentFlashCard;
                this._flashCards.splice(_.indexOf(this._flashCards, flashCard), 1);
                this.currentFlashCard = _.first(this.flashCards());
            };
            // simply move flashCard to end of the list
            this.markForLater = function (flashCard) {
                var flashCards = this.flashCards();
                flashCards.splice(_.indexOf(flashCards, flashCard), 1);
                flashCards.push(flashCard);
            };
            // place the flashCard in the middle of the list
            this.markForSoon = function () {
                var flashCards = this.flashCards();
                var flashCard = this.currentFlashCard;
                flashCards.splice(_.indexOf(flashCards, flashCard), 1);
                flashCards.splice(parseInt(this.poolSize), 0, flashCard);
                this.currentFlashCard = _.first(this.flashCards());
            };
            this.markForReview = function () {
                var flashCard = this.currentFlashCard;
                var flashCards = this.flashCards();
                var reviewPosition = this.poolSize + this.reviewIntervall;
                flashCards.splice(_.indexOf(flashCards, flashCard), 1);
                flashCards.splice(parseInt(reviewPosition), 0, flashCard);
                this.currentFlashCard = _.first(this.flashCards());
            };
            this.checkAnswer = function (userAnswer) {
                var flashCard = this.currentFlashCard;
                var displayAnswer = false;
                if (flashCard.answer == userAnswer) {
                    this.markAnswerAsCorrect();
                }
                if (flashCard.answer != userAnswer) {
                    displayAnswer = true;
                }
                return displayAnswer;
            };
            this.markAnswerAsCorrect = function () {
                var flashCard = this.currentFlashCard;
                if (flashCard.poolStatus == 1) {
                    this.trashFlashCard(flashCard)
                    flashCard.markAsCorrectAnswered();
                }
                if (flashCard.poolStatus == 0) {
                    this.markForReview(flashCard)
                    flashCard.markAsCorrectAnswered();
                }
                if (flashCard.poolStatus == -1) {
                    this.markForSoon(flashCard)
                    flashCard.markAsCorrectAnswered();
                }

            };
            this.markAnswerAsWrong = function () {
                var flashCard = this.currentFlashCard;
                flashCard.markAsWrongAnswered();
                this.markForSoon(flashCard);
            }
            this.setPoolsize = function(poolsize){
                this.poolSize = poolsize;
            }
            this.setReviewIntervall = function(intervall){
                this.reviewIntervall = intervall;
            }
        }

        var vocab = new Vocab();
        return vocab;

    });

