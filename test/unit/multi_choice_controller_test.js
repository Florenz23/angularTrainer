describe('tabs', function () {
    var scope, controller;

    // load the tabs code
    beforeEach(module('vocabTrainer'));

    // load the templates

    beforeEach(inject(function ($controller, $rootScope, $compile) {
        scope = $rootScope.$new();
        controller = $controller('QuizController', {
            '$scope': scope
        });
    }));

    describe('check the change of the class if an answer is selected', function () {
        beforeEach(function () {
            scope.flashCard = {
                "question": "Wyh is the sky blue?",
                "answers": [
                    {
                        "value": "blah blah 1",
                        "correct": true
                    },
                    {
                        "value": "blah blah 2",
                        "correct": false
                    },
                    {
                        "value": "blah blah 3",
                        "correct": false
                    },
                ]
            };
        });
        it('correct answer selected should be set to true', function () {
            scope.answers[0] = "blah blah 1";
            var answers = scope.showResult();
            expect(answers[0].correct).toEqual(true);
            expect(answers[0].selected).toEqual('true');
        });
        it('correct answer selected should be set to false', function () {
            scope.answers[0] = "blah blah 2";
            var answers = scope.showResult();
            expect(answers[1].correct).toEqual(false);
            expect(answers[1].selected).toEqual('false');
        });
    });
    describe('check nextFlashCard', function () {
        beforeEach(function () {
            scope.flashCards = [{
                "question": "Frage1",
                "answers": [
                    {
                        "value": "blah blah 1",
                        "correct": true
                    },
                    {
                        "value": "blah blah 2",
                        "correct": false
                    },
                    {
                        "value": "blah blah 3",
                        "correct": false
                    }
                ]
            }, {
                "question": "Frage2",
                "answers": [
                    {
                        "value": "blah blah 1",
                        "correct": true
                    },
                    {
                        "value": "blah blah 2",
                        "correct": false
                    },
                    {
                        "value": "blah blah 3",
                        "correct": false
                    }]
            }
            ];
            scope.flashCard = scope.flashCards[0];
        });
        describe('nextFlashCard',function(){
            it('should be defined', function () {
                expect(scope.nextFlashCard).toBeDefined();
            });
            it('should be defined', function () {
                expect(scope.flashCard.question).toEqual("Frage1");
                scope.nextFlashCard();
                expect(scope.flashCard.question).toEqual("Frage2");
            });
        });
        describe('nextFlashCard',function(){
            it('should be defined', function () {
                expect(scope.nextFlashCard).toBeDefined();
            });
            it('should be defined', function () {
                expect(scope.flashCard.question).toEqual("Frage1");
                scope.nextFlashCard();
                expect(scope.flashCard.question).toEqual("Frage2");
            });
        });
    });
    describe('checkUsersAnswer', function () {
        beforeEach(function () {
            scope.flashCard = {
                "question": "Wyh is the sky blue?",
                "answers": [
                    {
                        "value": "richtig",
                        "correct": true
                    },
                    {
                        "value": "falsch",
                        "correct": false
                    },
                    {
                        "value": "falsch1",
                        "correct": false
                    },
                ]
            };
        });
        it('should be defined', function () {
            expect(scope.checkUserAnswer).toBeDefined()
        });
        it('should work correctly', function () {
            scope.answers[0] = "richtig";
            scope.showResult();
            expect(scope.checkUserAnswer(scope.answers)).toEqual(true);
            scope.answers[0] = "falsch";
            scope.showResult();
            expect(scope.checkUserAnswer(scope.answers)).toEqual(false);
            scope.answers[0] = "falsch1";
            scope.showResult();
            expect(scope.checkUserAnswer(scope.answers)).toEqual(false);
        });
    });
});



