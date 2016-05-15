angular.module('vocabTrainer').controller('QuizController', function ($scope) {
    "use strict";
    $scope.moin = "jojo";
    $scope.question =
    {
        "questionText": "Why is the sky blue?", "answers": [
        {"answerText": "blah blah 1", "correct": true},
        {"answerText": "blah blah 2", "correct": false},
        {"answerText": "blah blah 3", "correct": false}
    ]
    };
    $scope.answers = {};
    $scope.showResult = function () {
        $scope.correctCount = 0;
        var answers = $scope.question.answers;
        $scope.question.userAnswerCorrect = false;
        $scope.getUserAnswer();
        for (var j = 0; j < answers.length; j++) {
            answers[j].selected = "donno";
            answers = $scope.checkIfSelectedAnswerIsCorrect(j, answers);
            answers = $scope.checkIfSelectedAnswerIsWrong(j, answers);
        }
        return answers;
        //console.log($scope.answers);
    };
    $scope.getUserAnswer = function () {
        $scope.question.userAnswer = $scope.answers[0];
    };
    $scope.checkIfSelectedAnswerIsCorrect = function (j, answers) {
        if ($scope.question.userAnswer === answers[j].answerText && answers[j].correct === true) {
            $scope.question.userAnswerCorrect = true;
            answers[j].selected = "true";
        }
        return answers;
    };
    $scope.checkIfSelectedAnswerIsWrong = function (j, answers) {
        if ($scope.question.userAnswer === answers[j].answerText && answers[j].correct === false) {
            answers[j].selected = "false";
        }
        return answers;
    };
});