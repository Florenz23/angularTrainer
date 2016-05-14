angular.module('vocabTrainer').controller('QuizController', function ($scope) {
    "use strict";
    $scope.questions = [
        {
            "questionText": "Why is the sky blue?", "answers": [
            {"answerText": "blah blah 1", "correct": true},
            {"answerText": "blah blah 2", "correct": false},
            {"answerText": "blah blah 3", "correct": false}
        ]
        }
    ];
    $scope.answers = {};
    $scope.correctCount = 0;
    $scope.showResult = function () {
        $scope.correctCount = 0;
        var qLength = $scope.questions.length;
        var i = 0;
        var answers = $scope.questions[i].answers;
        $scope.questions[i].userAnswerCorrect = false;
        $scope.questions[i].userAnswer = $scope.answers[i];
        for (var j = 0; j < answers.length; j++) {
            answers[j].selected = "donno";
            if ($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct === true) {
                $scope.questions[i].userAnswerCorrect = true;
                answers[j].selected = "true";
            }
            if ($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct === false) {
                answers[j].selected = "false";
            }
        }
        //console.log($scope.answers);
    };
    $scope.checkIfSelectedAnswerIsCorrect = function(){

    }
});