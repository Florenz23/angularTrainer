angular.module('vocabTrainer').controller('SimpleTrainerController', function ($scope, Vocab) {
    $scope.$emit('loadedController', 'simple-trainer');
    $scope.flashCard = Vocab.currentFlashCard;
    $scope.displayAnswer = false;

    $scope.seeAnswer = function () {
        $scope.displayAnswer = true;
    }
    $scope.checkAnswer = function (userAnswer) {
        if (Vocab.checkAnswer(userAnswer)){
          $scope.displayAnswer = true;
        }else {
            $scope.displayAnswer = false;
            $scope.flashCard = Vocab.currentFlashCard;
            $scope.userAnswer = null;
        }
    };

    $scope.acceptAnswer = function(){
        Vocab.markAnswerAsCorrect();
        proceedToNextFlashCard();
    }
    $scope.denyAnswer = function(){
        Vocab.markAnswerAsWrong();
        proceedToNextFlashCard();
    }
    $scope.showAnswer = function(){
        $scope.displayAnswer = true;
    }

    var proceedToNextFlashCard = function () {
        $scope.flashCard = Vocab.currentFlashCard;
        $scope.displayAnswer = false;
    };

    $scope.soon = function (word) {
        Vocab.markForSoon(word);
        proceedToNextFlashCard();
    };

    $scope.later = function (word) {
        Vocab.markForLater(word);
        proceedToNextFlashCard();
    }
    $scope.keyUpCheckAnswer = function (userAnswer) {
        event.preventDefault();
        if(event.keyCode == 13){
            console.log("jojo");
            console.log(userAnswer);
            $scope.checkAnswer(userAnswer);

        }
    };
    $scope.setEnterAction = function (userAnswer) {
        console.log($scope.displayAnswer);
        if ($scope.displayAnswer === true) {
            console.log("deny");
            return $scope.denyAnswer();
        }
        if ($scope.displayAnswer === false) {
            console.log("check");
            return $scope.checkAnswer(userAnswer);
        }
    }
}).directive('normalFlashCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/simple-trainer.html'
    };
});

