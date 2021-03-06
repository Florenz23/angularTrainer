/**
 * Created by Florenz on 13.05.16.
 */
var testArray = new Array();
testArray["1002"] = new Array(
    2,
    0,
    new Array(
        "Frage"),
    new Array(
        new Array(true, "Antwort1"),
        new Array(false, "Antwort2"),
        new Array(false, "Antwort3"),
        new Array(false, "Antwort4")));
testArray["1003"] = new Array(
    3,
    0,
    new Array(
        "Frage"),
    new Array(
        new Array(true, "Antwort1"),
        new Array(false, "Antwort2"),
        new Array(false, "Antwort3"),
        new Array(false, "Antwort4")));
describe('boot_test', function () {
    objArray = convertTrainerArray(testArray);
    describe('checkArray', function () {
        it('check', function () {
            expect(FA).toBeDefined()
        });
        it('check', function () {
            var i = "1001";
            i = parseInt(i);
            i++;
            i = i.toString();
            expect(testArray[i][2][0]).toEqual("Frage");
            expect(testArray['1002'][3][0][0]).toEqual(true);
            expect(testArray['1002'][3][0][1]).toEqual("Antwort1");
        });
        it('MultiChoiceFlashCardClass', function () {
            expect(MultiChoiceFlashCard).toBeDefined()
        });
    });
    describe('checkClass', function () {
        it('MultiChoiceFlashCardClass', function () {
            expect(MultiChoiceFlashCard).toBeDefined()
        });
        it('check length', function () {
            expect(objArray.length).toEqual(2);
        });
        it('check first object', function () {
            expect(objArray[0]).toBeDefined();
            expect(objArray[0].question).toBeDefined();
            expect(objArray[0].question).toEqual("Frage");
            expect(objArray[0].answers[0].value).toEqual("Antwort1");
            expect(objArray[0].answers[0].correct).toEqual(true);
            expect(objArray[0].answers[3].correct).toEqual(false);
            expect(objArray[0].id).toEqual(1002);
        });
        it('check second object', function () {
            expect(objArray[1]).toBeDefined();
            expect(objArray[1].question).toBeDefined();
            expect(objArray[1].question).toEqual("Frage");
            expect(objArray[1].answers[0].value).toEqual("Antwort1");
            expect(objArray[1].answers[0].correct).toEqual(true);
            expect(objArray[1].answers[3].correct).toEqual(false);
            expect(objArray[1].id).toEqual(1003);
        });
    });
});
