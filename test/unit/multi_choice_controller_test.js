fdescribe('tabs', function () {
    var elm, scope, controller;

    // load the tabs code
    beforeEach(module('vocabTrainer'));

    // load the templates
    beforeEach(module('views/ranji_multi.html'));
    var scope, ctrl;

    beforeEach(inject(function ($controller, $rootScope, $compile) {
        elm = angular.element(
            '<div>'+
            '<quiz></quiz>' +
            '</div>');
        scope = $rootScope;
        $compile(elm)(scope);
        controller = $controller('QuizController', {
            '$scope': scope
        });
    }));

    describe('checkAnswer', function () {
        it('correct answer selected should be set to true', inject(function ($compile, $rootScope) {
            scope.answers[0] = "blah blah 1";
            var answers = scope.showResult();
            console.log(answers);
            expect(answers[0].correct).toEqual(true);
        }));
        it('correct answer selected should be set to false', inject(function ($compile, $rootScope) {
            scope.answers[0] = "blah blah 2";
            var answers = scope.showResult();
            console.log(answers);
            expect(answers[1].correct).toEqual(false);
        }));
    });
});



