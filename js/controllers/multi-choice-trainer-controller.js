angular.module('vocabTrainer').controller('MultiChoiceTrainerController', function ($scope,Vocab) {
    $scope.$emit('loadedController', 'multi-choice-trainer');
    "use strict";
    $scope.shuffleFlashCardAnswers = function(){
        $scope.flashCard.answers = shuffleArray($scope.flashCard.answers);
    };
    $scope.ini = function () {
        var dbFlashCards = $scope.getFlashCards();
        Vocab.iniTrainer(dbFlashCards);
        $scope.flashCard = Vocab.currentFlashCard;
        $scope.shuffleFlashCardAnswers();
    };
    $scope.getFlashCards = function(){
        var flashCards = convertTrainerArray(FA);
        return flashCards;
    };
    $scope.ini();
    $scope.answers = {};
    $scope.showResult = function () {
        $scope.correctCount = 0;
        var answers = $scope.flashCard.answers;
        $scope.flashCard.userAnswerCorrect = false;
        $scope.getUserAnswer();
        for (var j = 0; j < answers.length; j++) {
            answers[j].selected = "donno";
            answers = $scope.checkIfSelectedAnswerIsCorrect(j, answers);
            answers = $scope.checkIfSelectedAnswerIsWrong(j, answers);
        }
        $scope.checkUserAnswer(answers);
        $scope.getUserAnswerIndex(answers);
        console.log(answers);
        return answers;
        //console.log($scope.answers);
    };
    $scope.getUserAnswer = function () {
        $scope.flashCard.userAnswer = $scope.answers[0];
    };
    $scope.checkIfSelectedAnswerIsCorrect = function (j, answers) {
        if ($scope.flashCard.userAnswer === answers[j].value && answers[j].correct === true) {
            $scope.flashCard.userAnswerCorrect = true;
            answers[j].selected = "true";
        }
        return answers;
    };
    $scope.checkIfSelectedAnswerIsWrong = function (j, answers) {
        if ($scope.flashCard.userAnswer === answers[j].value && answers[j].correct === false) {
            answers[j].selected = "false";
        }
        return answers;
    };
    $scope.startIndex = 0;
    $scope.nextFlashCard = function(){
        $scope.startIndex++;
        $scope.flashCard = $scope.flashCards[$scope.startIndex];
        $scope.shuffleFlashCardAnswers();
    };
    $scope.checkUserAnswer = function(){
        var answers = $scope.flashCard.answers;
        for (var i = 0; i< answers.length;i++){
            if ($scope.flashCard.userAnswer === answers[i].value && answers[i].correct === true) {
                $scope.acceptAnswer();
                return true;
            }
        }
        $scope.denyAnswer();
        return false;
    };
    $scope.refreshSelection = function () {
        var answers = $scope.flashCard.answers;
        $scope.getUserAnswer();
        for (var j = 0; j < answers.length; j++) {
            answers[j].selected = "donno";
        }
    };
    $scope.proceedToNextFlashCard = function () {
        $scope.refreshSelection();
        $scope.flashCard = Vocab.currentFlashCard;
    };
    $scope.acceptAnswer = function(){
        Vocab.markAnswerAsCorrect();
    };
    $scope.denyAnswer = function(){
        Vocab.markAnswerAsWrong();
    };
    $scope.random = function() {
        return 0.5 - Math.random();
    };

}).directive('multiChoiceFlashCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/multi-choice-trainer.html'
    };
});
