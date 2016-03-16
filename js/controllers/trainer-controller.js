

angular.module('vocabTrainer').controller('TrainerController', function ($scope, Vocab) {
    $scope.$emit('loadedController', 'trainer');
    $scope.word = Vocab.nextWord();

    $scope.seeAnswer = function () {
        $scope.displayAnswer = true;
    }

    var proceedToNextWord = function () {
        $scope.word = Vocab.nextWord();
        $scope.displayAnswer = false;
    }

    $scope.soon = function (word) {
        Vocab.markForSoon(word);
        proceedToNextWord();
    }

    $scope.later = function (word) {
        Vocab.markForLater(word);
        proceedToNextWord();
    }
});






