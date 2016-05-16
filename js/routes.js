/**
 * Created by Florenz on 16.03.16.
 */

angular.module('vocabTrainer')
    .config(function ($routeProvider) {
        $routeProvider.
            when('/', {
                controller: 'TrainerController',
                templateUrl: 'views/trainer.html'
            }).
            when('/trainer', {
                controller: 'TrainerController',
                templateUrl: 'views/trainer.html'
            }).
            when('/simpleTrainer', {
                controller: 'SimpleTrainerController',
                templateUrl: 'views/simple-trainer.html'
            }).
            when('/multiChoiceTrainer', {
                controller: 'MultiChoiceTrainerController',
                templateUrl: 'views/multi-choice-trainer.html'
            })
    });

