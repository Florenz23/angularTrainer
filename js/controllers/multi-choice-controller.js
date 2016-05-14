/**
 * Created by Florenz on 21.03.16.
 */

angular.module('vocabTrainer').controller('MultipleChoiceController', function ($scope, Vocab) {
    $scope.startIndex = 1001
    $scope.flashCard = {
        question: FA[$scope.startIndex][2][0],
        answerArray :FA[$scope.startIndex][3]
    };
    $scope.flashCards = FA;
    $scope.next = function(){
        $scope.startIndex++;
    }
});