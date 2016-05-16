angular.module('vocabTrainer').controller('SimpleTrainerController', function ($scope, Vocab) {
    $scope.$emit('loadedController', 'simple-trainer');
    $scope.flashCard = Vocab.currentFlashCard;
    $scope.displayAnswer = false;


    $scope.iniTrainer = function () {
        //Vocab.chargeVocs(this.flashCards);
        Vocab.iniTrainer();
        this.flashCard = Vocab.currentFlashCard;
        this.displayAnswer = false;
    };
    $scope.iniTrainer();

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
    };
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
        $scope.proceedToNextFlashCard();
    }
    $scope.denyAnswer = function(){
        Vocab.markAnswerAsWrong();
        $scope.proceedToNextFlashCard();
    }
    $scope.showAnswer = function(){
        $scope.displayAnswer = true;
    }

    $scope.proceedToNextFlashCard = function () {
        $("#user_answer").val("");
        $scope.flashCard = Vocab.currentFlashCard;
        $scope.displayAnswer = false;
    };

    $scope.soon = function (word) {
        Vocab.markForSoon(word);
        $scope.proceedToNextFlashCard();
    };

    $scope.later = function (word) {
        Vocab.markForLater(word);
        $scope.proceedToNextFlashCard();
    };
}).directive('normalFlashCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/simple-trainer.html'
    };
});

