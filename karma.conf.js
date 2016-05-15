// Karma configuration file
// See http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'js/vendor/jquery.js',
            'js/vendor/jasmine-jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-event/dist/event.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/lodash/lodash.js',
            'views/*.html',
            'js/classes/*.js',
            'js/app.js',
            'js/routes.js',
            'js/controllers/*.js',
            'js/directives/*.js',
            'js/services/*.js',
            'test/unit/*.js'
        ],

        // generate js files from html templates
        preprocessors: {
            'views/*.html': ['ng-html2js'],
        },

        autoWatch: true,
        browsers: ['Chrome']
    });
};

