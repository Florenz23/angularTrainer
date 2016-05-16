/**
 * Created by Florenz on 21.03.16.
 */

angular.module('vocabTrainer').controller('MultipleChoiceController', function ($scope, Vocab) {
    $scope.startIndex = 0;
    $scope.flashCards = convertTrainerArray(FA);
    $scope.flashCard = $scope.flashCards[$scope.startIndex];
    $scope.flashCardCorrect = "jojo";
    $scope.next = function(){
        $scope.startIndex++;
        $scope.flashCard = $scope.flashCards[$scope.startIndex];
        console.log($scope.flashCardCorrect);
    }
}).directive('multiChoiceFlashCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/ranji_multi.html'
    };
});