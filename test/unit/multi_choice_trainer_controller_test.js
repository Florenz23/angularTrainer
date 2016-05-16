describe('tabs', function () {
    var scope, controller, Vocab;

    // load the tabs code
    beforeEach(module('vocabTrainer'));

    // load the templates

    beforeEach(inject(function ($controller, $rootScope, $injector) {
        Vocab = $injector.get('Vocab');
        scope = $rootScope.$new();
        controller = $controller('MultiChoiceTrainerController', {
            '$scope': scope,
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

    describe('check markAnswer functions', function () {
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
        it('markAnswerAsCorrect', function () {
            spyOn(scope, 'acceptAnswer');
            scope.answers[0] = "blah blah 1";
            scope.showResult();
            expect(scope.acceptAnswer).toHaveBeenCalled();
        });
        it('markAnswerAsWrong', function () {
            spyOn(scope, 'denyAnswer');
            scope.answers[0] = "blah blah 2";
            var answers = scope.showResult();
            expect(scope.denyAnswer).toHaveBeenCalled();
        });
    });
    describe('proceedToNextFlashCard', function () {
        it('should be defined', function () {
            expect(scope.proceedToNextFlashCard).toBeDefined();
        });
        it('should jump no next flash card', function () {
            var value1 = scope.flashCard.id;
            scope.acceptAnswer();
            scope.proceedToNextFlashCard();
            var value2 = scope.flashCard.id;
            expect(value1).not.toEqual(value2);
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



