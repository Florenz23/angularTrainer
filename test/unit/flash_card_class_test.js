/**
 * Created by Florenz on 17.03.16.
 */


describe('FlashCard Factory', function () {

    var dbFlashCard;
    var flashCard;


    dbFlashCard =
    {
        question: 'Banana',
        answer: 'Banane'
    }
    ;

    describe('Check correct Values of the Flash Card after receiving it from the db', function () {
        flashCard = new ClassFlashCard(dbFlashCard)
        it('setStartPoolStatus should be defined', function () {
            expect(flashCard.setStartPoolStatus).toBeDefined();
        });
        it('check poolStatus ', function () {
            expect(flashCard.poolStatus).toEqual(1);
            ;
        });
    });
    describe('Answer a flash card wrong', function () {
        flashCard = new ClassFlashCard(dbFlashCard)
        it('markAsWrongAnswered should be defined', function () {
            expect(flashCard.markAsWrongAnswered).toBeDefined();
        });
        it('poolStatus should be -1', function () {
            flashCard.markAsWrongAnswered();
            expect(flashCard.poolStatus).toEqual(-1);
        });
    });
    describe('Answer a flash card correctly', function () {
        flashCard = new ClassFlashCard(dbFlashCard)
        it('markAsCorrectAnswered should be defined', function () {
            expect(flashCard.markAsCorrectAnswered).toBeDefined();
        });
        it('poolStatus should be 0', function () {
            flashCard.markAsCorrectAnswered();
            expect(flashCard.poolStatus).toEqual(0);
        });
        it('poolStatus should be 1', function () {
            flashCard.markAsCorrectAnswered();
            expect(flashCard.poolStatus).toEqual(1);
        });
        it('poolStatus should be 1', function () {
            flashCard.markAsCorrectAnswered();
            expect(flashCard.poolStatus).toEqual(1);
        });
    });
});
