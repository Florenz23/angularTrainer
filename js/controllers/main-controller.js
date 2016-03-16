/**
 * Created by Florenz on 16.03.16.
 */



angular.module('vocabTrainer').controller('MainController', function ($scope, Vocab, $location) {
    $scope.$emit('loadedController', 'words');


    $scope.words = Vocab.words();
    $scope.trashWord = function (word) {
        Vocab.trashWord(word);
    }
    $scope.editWord = function (word) {
        $location.path("/words/" + word.word)
    }

    $scope.sortProperty = 'word';
    $scope.sortReverse = false;

    $scope.sortWords = function (property) {
        console.log('now sorting words - where you go?');
        $scope.sortProperty = property;
        $scope.sortReverse = !$scope.sortReverse;
    }
})






