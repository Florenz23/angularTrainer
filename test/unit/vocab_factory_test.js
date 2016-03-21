describe('Vocab Factory', function () {

    beforeEach(module('vocabTrainer'));
    var DbFlashCardArray;
    var FlashCardArray = new Array();
    var Vocab;
    var pool_size = 5;

    beforeEach(inject(function ($injector) {
            Vocab = $injector.get('Vocab');
            DbFlashCardArray = [
                {question: 'Banana', poolStatus: 1, answer: 'Banane'},
                {question: 'Apple', poolStatus: 0, answer: 'Apfel'},
                {question: 'Plum', poolStatus: -1, answer: 'Pflaume'},
                {
                    question: 'Grape', answer: 'A berry growing in clusters on a grapevine'
                },
                {question: 'Orange', answer: 'A j'},
                {question: 'Pear', answer: 'A j'},
                {question: 'Pear1', answer: 'A j'},
                {question: 'Pear2', answer: 'A j'},
                {question: 'Pear3', answer: 'A j'},
                {question: 'Pear4', answer: 'A j'},
                {question: 'Pear5', answer: 'A j'},
            ]
            ;
            FlashCardArray = new Array();
            for (var i = 0; i < DbFlashCardArray.length; i++) {
                var obj = new ClassFlashCard(DbFlashCardArray[i]);
                FlashCardArray.push(obj);
            }
            Vocab._flashCards = FlashCardArray;
            Vocab.init();
        })
    )
    ;
    describe('set Poolsize', function () {
        it('poolSize should be set to 10', function () {
            expect(Vocab.poolSize).toEqual(5);
            Vocab.setPoolsize(10);
            expect(Vocab.poolSize).toEqual(10);
        });
    });
    describe('set ReviewIntervall', function () {
        it('reviewIntervall should be set to 10', function () {
            expect(Vocab.reviewIntervall).toEqual(5);
            Vocab.setReviewIntervall(10);
            expect(Vocab.reviewIntervall).toEqual(10);
        });
    });

    describe('nextFlashCard', function () {
        it('should retrieve the next flasCard in the list', function () {
            Vocab.currentFlashCard = Vocab.wordByName('Plum');
            expect(Vocab.nextFlashCard().question).toEqual('Grape');
        });

        it('should return to the start of the list once the end is reached', function () {
            Vocab.currentFlashCard = Vocab.wordByName('Pear5');
            expect(Vocab.nextFlashCard().question).toEqual('Banana');
        });
        it('should update currentFlashCard', function () {
            expect(Vocab.currentFlashCard.question).toEqual('Banana');
            Vocab.nextFlashCard();
            expect(Vocab.currentFlashCard.question).toEqual('Apple');
        });
    });

    describe('markForLater', function () {
        it('should place the flashCard to the back of the flashCard list', function () {
            Vocab.markForLater(Vocab.flashCards()[0]);
            expect(_.last(Vocab.flashCards()).question).toEqual('Banana');
        });
    });

    describe('markForSoon', function () {
        it('should place the flashCard to the [poolsize] posotion of the flashCard list', function () {
            var pool_size = 3;
            Vocab.setPoolsize(pool_size);
            expect(Vocab.flashCards()[0].question).toEqual('Banana');
            Vocab.markForSoon();
            expect(Vocab.flashCards()[pool_size].question).toEqual('Banana');
            expect(Vocab.flashCards()[0].question).toEqual('Apple');
        });
        it('current flash card should be updated', function () {
            expect(Vocab.currentFlashCard.question).toEqual('Banana');
            Vocab.markForSoon();
            expect(Vocab.currentFlashCard.question).toEqual('Apple');
        });
    });
    describe('markForReview', function () {
        it('should place the flashCard to the [poolsize] posotion of the flashCard list', function () {
            var pool_size = 3;
            var review_intervall = 3;
            var review_position = pool_size + review_intervall;
            Vocab.setPoolsize(pool_size);
            Vocab.setReviewIntervall(review_intervall);
            expect(Vocab.flashCards()[0].question).toEqual('Banana');
            Vocab.markForReview(Vocab.flashCards()[0]);
            expect(Vocab.flashCards()[review_position].question).toEqual('Banana');
            expect(Vocab.flashCards()[0].question).toEqual('Apple');
        });
        it('current flash card should be updated', function () {
            expect(Vocab.currentFlashCard.question).toEqual('Banana');
            Vocab.markForReview();
            expect(Vocab.currentFlashCard.question).toEqual('Apple');
        });
    });

    describe('wordByName', function () {
        it('retrieve the FlashCard object for a given flashCard', function () {
            expect(Vocab.wordByName('Grape').answer).toEqual('A berry growing in clusters on a grapevine');
        });
    });

    describe('trashFlashCard', function () {
        it('remove a FlashCard object from the flashCards list', function () {
            Vocab.trashFlashCard();
            expect(Vocab.wordByName('Banana')).toEqual(undefined);
        });
        it('current flash card should be updated', function () {
            expect(Vocab.currentFlashCard.question).toEqual('Banana');
            Vocab.trashFlashCard();
            expect(Vocab.currentFlashCard.question).toEqual('Apple');
        });
    });
    describe('Check answer ok value', function () {
        it('ok value should be -2 at start', function () {
            expect(Vocab.flashCards()[0].poolStatus).toEqual(1);
            ;
        });
    });

    describe('markAnswerAsCorrect', function () {
        it('should be defined', function () {
            expect(Vocab.markAnswerAsCorrect).toBeDefined();
        });
        it('should call flashCardWrongAnswered', function () {
            var firstFlashCard = Vocab.flashCards()[0];
            spyOn(firstFlashCard, 'markAsCorrectAnswered');
            Vocab.markAnswerAsCorrect();
            expect(firstFlashCard.markAsCorrectAnswered).toHaveBeenCalled();
        });
        it('pool status 1 should be set to pool status 1', function () {
            spyOn(Vocab, 'trashFlashCard').and.callThrough();
            var flashCard = Vocab.flashCards()[0];
            Vocab.currentFlashCard = flashCard;
            expect(flashCard.poolStatus).toEqual(1);
            ;
            Vocab.markAnswerAsCorrect();
            expect(Vocab.trashFlashCard).toHaveBeenCalled();
            expect(Vocab.wordByName('Banana')).toEqual(undefined);
        });
        it('pool status 0 should be set to pool status 1', function () {
            var pool_size = 3;
            var review_intervall = 3;
            var review_position = pool_size + review_intervall;
            var flashCard = Vocab.flashCards()[1];
            Vocab.setPoolsize(pool_size);
            Vocab.setReviewIntervall(review_intervall);
            spyOn(Vocab, 'markForReview').and.callThrough();
            Vocab.currentFlashCard = flashCard;
            Vocab.markAnswerAsCorrect();
            expect(flashCard.poolStatus).toEqual(1);
            expect(Vocab.markForReview).toHaveBeenCalled();
            expect(Vocab.flashCards()[review_position].question).toEqual('Apple');
        });
        it('pool status -1 should be set to pool status 0', function () {
            var pool_size = 3;
            var flashCard = Vocab.flashCards()[2];
            Vocab.setPoolsize(pool_size);
            spyOn(Vocab, 'markForSoon').and.callThrough();
            Vocab.currentFlashCard = flashCard;
            Vocab.markAnswerAsCorrect();
            expect(flashCard.poolStatus).toEqual(0);
            ;
            expect(Vocab.markForSoon).toHaveBeenCalled();
            expect(Vocab.flashCards()[pool_size].question).toEqual('Plum');
        });
    });
    describe('markAnswerAsWrong', function () {
        it('should be defined', function () {
            expect(Vocab.markAnswerAsWrong).toBeDefined();
        });
        it('should call flashCardWrongAnswered', function () {
            var firstFlashCard = Vocab.flashCards()[0];
            spyOn(firstFlashCard, 'markAsWrongAnswered');
            Vocab.markAnswerAsWrong();
            expect(firstFlashCard.markAsWrongAnswered).toHaveBeenCalled();
        });
        it('pool status 1 should be set to pool status -1', function () {
            var flashCard = Vocab.flashCards()[0];
            var pool_size = 3;
            Vocab.setPoolsize(pool_size);
            spyOn(Vocab, 'markForSoon').and.callThrough();
            Vocab.currentFlashCard = flashCard;
            Vocab.markAnswerAsWrong();
            expect(flashCard.poolStatus).toEqual(-1);
            ;
            expect(Vocab.markForSoon).toHaveBeenCalled();
            expect(Vocab.flashCards()[pool_size].question).toEqual('Banana');
        });
        it('pool status 0 should be set to pool status -1', function () {
            var flashCard = Vocab.flashCards()[1];
            spyOn(Vocab, 'markForSoon');
            Vocab.currentFlashCard = flashCard;
            Vocab.markAnswerAsWrong();
            var flashCard = Vocab.flashCards()[1];
            expect(flashCard.poolStatus).toEqual(-1);
            ;
            expect(Vocab.markForSoon).toHaveBeenCalled();
        });
        it('pool status -1 should be set to pool status -1', function () {
            spyOn(Vocab, 'markForSoon');
            var flashCard = Vocab.flashCards()[2];
            Vocab.currentFlashCard = flashCard;
            Vocab.markAnswerAsWrong();
            var flashCard = Vocab.flashCards()[2];
            expect(flashCard.poolStatus).toEqual(-1);
            ;
            expect(Vocab.markForSoon).toHaveBeenCalled();
        });
    });

    describe('function checkAnswer', function () {
        describe('correct Answer', function () {
            it('should call markAnswerAsCorrect', function () {
                spyOn(Vocab, 'markAnswerAsCorrect');
                Vocab.checkAnswer("Banane");
                expect(Vocab.markAnswerAsCorrect).toHaveBeenCalled();
            });
            it('display answer should be false', function () {
                var displayAnswer = Vocab.checkAnswer("Banane");
                expect(displayAnswer).toEqual(false);
                ;
            });
            it('after answering correctly the next voc should be displayed', function () {
                expect(Vocab.currentFlashCard.question).toEqual('Banana');
                Vocab.checkAnswer("Banane");
                expect(Vocab.currentFlashCard.question).toEqual('Apple');
                ;
            });
        });
        describe('wrong Answer', function () {
            it('should call markAnswerAsWrong', function () {
                var displayAnswer = Vocab.checkAnswer("Amenaa!!!");
                expect(displayAnswer).toEqual(true);
            });
            it('after answering wrongly the same card should be displayed', function () {
                expect(Vocab.currentFlashCard.question).toEqual('Banana');
                Vocab.checkAnswer("Amena!!!");
                expect(Vocab.currentFlashCard.question).toEqual('Banana');
                ;
            });
        });
        describe('delete known flashCards from list', function () {
            it('first flash card should be deleted after answered correctly', function () {
                Vocab.markAnswerAsCorrect();
                expect(Vocab.wordByName('Banana')).toEqual(undefined);
            });
            it('flashCard without rating should be delted from list after answered correctly', function () {
                Vocab.nextFlashCard();
                Vocab.nextFlashCard();
                Vocab.nextFlashCard();
                expect(Vocab.currentFlashCard.question).toEqual('Grape');
                Vocab.markAnswerAsCorrect();
                expect(Vocab.wordByName('Grape')).toEqual(undefined);
            });
        });

    });
})
;
