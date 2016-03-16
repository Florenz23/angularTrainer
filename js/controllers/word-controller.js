angular.module('vocabTrainer').controller('WordController', function ($scope, $routeParams, Vocab) {
    var name = $routeParams.word;
    $scope.word = Vocab.wordByName(name);
});
