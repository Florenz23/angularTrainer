/**
 * Created by Florenz on 18.03.16.
 */

jasmine.getFixtures().fixturesPath = 'base/views/';
describe('vocabTrainer', function () {
    var scope,
        controller;
    beforeEach(function () {
        module('vocabTrainer');
    });

    describe('AboutController', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('AboutController', {
                '$scope': scope
            });
            fixture = readFixtures("about.html");

        }));
        it('sets the name', function () {
            console.log(fixture);
            expect(scope.moin).toBe('jojo');
        });
        it('sets the name', function () {
            expect(scope.test()).toBe('jo');
        });

    });


});