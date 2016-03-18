angular.module('vocabTrainer').controller('AboutController', function ($scope, Vocab) {
    $scope.$emit('loadedController', 'trainer');
    $scope.flashCard = Vocab.nextFlashCard();
    $scope.moin = "jojo";

    $scope.seeAnswer = function () {
        $scope.displayAnswer = true;
    }
    $scope.test = function () {
        return Vocab.test();
    }

    var proceedToNextFlashCard = function () {
        $scope.flashCard = Vocab.nextFlashCard();
        $scope.displayAnswer = false;
    }

    $scope.soon = function (word) {
        Vocab.markForSoon(word);
        proceedToNextFlashCard();
    }

    $scope.later = function (word) {
        Vocab.markForLater(word);
        proceedToNextFlashCard();
    }
});

