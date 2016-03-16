/**
 * Created by Florenz on 16.03.16.
 */

angular.module('vocabTrainer')
    .config(function ($routeProvider) {
        $routeProvider.
            when('/', {
                controller: 'MainController',
                templateUrl: 'views/words.html'
            }).
            when('/about', {
                controller: 'AboutController',
                templateUrl: 'views/about.html'
            }).
            when('/trainer', {
                controller: 'TrainerController',
                templateUrl: 'views/trainer.html'
            }).
            when('/words/:word', {
                controller: 'WordController',
                templateUrl: 'views/word.html'
            })
    });

