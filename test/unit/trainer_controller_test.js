/**
 * Created by Florenz on 18.03.16.
 */

jasmine.getFixtures().fixturesPath = 'base/views/';
describe('vocabTrainer', function () {
    var scope,
        controller,Vocab,DbFlashCardArray,FlashCardArray;
    beforeEach(function () {
        module('vocabTrainer');
    });

    describe('AboutController', function () {
        beforeEach(inject(function ($rootScope, $controller,$injector) {
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
            scope = $rootScope.$new();
            controller = $controller('AboutController', {
                '$scope': scope
            });
            //fixture = readFixtures("about.html");

        }));
        describe('checkAnswer', function () {
            it('should be defined', function () {
                expect(scope.checkAnswer).toBeDefined();
            });
            describe('wrong Answer', function () {
                it('displayAnswer should be true', function () {
                    scope.checkAnswer("Amenaa!!");
                    expect(scope.displayAnswer).toEqual(true);
                });
                it('correct voc should be displayed', function() {
                    expect(scope.flashCard.question).toEqual("Banana");
                    scope.checkAnswer("Amenaa!!");
                    expect(scope.flashCard.question).toEqual("Banana");
                    ;
                });
            });
            describe('correct Answer', function () {
                it('displayAnswer should be true', function () {
                    scope.checkAnswer("Banane");
                    expect(scope.displayAnswer).toEqual(false);
                });
                it('correct voc should be displayed', function() {
                    expect(scope.flashCard.question).toEqual("Banana");
                    scope.checkAnswer("Banane");
                    expect(scope.flashCard.question).toEqual("Apple");
                    ;
                });
            });
        });
        describe('acceptAnswer', function () {
            it('should be defined', function () {
                expect(scope.acceptAnswer).toBeDefined();
            });
            it('trainer should proceed to next voc', function() {
                expect(scope.flashCard.question).toEqual("Banana");
                scope.checkAnswer("Amenaa!!");
                expect(scope.flashCard.question).toEqual("Banana");
                scope.acceptAnswer();
                expect(scope.flashCard.question).toEqual("Apple");
                expect(scope.displayAnswer).toEqual(false);
            });
        });
        describe('denyAnswer', function () {
            it('should be defined', function () {
                expect(scope.denyAnswer).toBeDefined();
            });
            it('trainer should proceed to next voc', function() {
                expect(scope.flashCard.question).toEqual("Banana");
                scope.checkAnswer("Amenaa!!");
                expect(scope.flashCard.question).toEqual("Banana");
                scope.denyAnswer();
                expect(scope.displayAnswer).toEqual(false);
                expect(scope.flashCard.question).toEqual("Apple");
            });
        });
        describe('showAnswer', function () {
            it('should be defined', function () {
                expect(scope.showAnswer).toBeDefined();
            });
            it('should be defined', function () {
                scope.showAnswer();
                expect(scope.displayAnswer).toEqual(true);
            });
        });

    });


});