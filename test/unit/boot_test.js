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
        new Array(true, "Antwort2"),
        new Array(true, "Antwort3"),
        new Array(false, "Antwort4")));
testArray["1003"] = new Array(
    3,
    0,
    new Array(
        "Frage"),
    new Array(
        new Array(true, "Antwort1"),
        new Array(true, "Antwort2"),
        new Array(true, "Antwort3"),
        new Array(false, "Antwort4")));
fdescribe('boot_test', function () {
    beforeEach(function () {
        objArray = [];
        var counter = "1000";
        for (var i = 0; i<testArray.length-1002;i++){
            counter = parseInt(counter);
            counter++;
            counter = counter.toString();
            var obj = new MultiChoiceFlashCard(testArray[counter])
            objArray[i] = obj;
        }
    });
    describe('checkArray', function () {
        it('check', function () {
            expect(FA).toBeDefined()
        });
        it('check', function () {
            var i = "1001";
            i = parseInt(i);
            i++;
            i= i.toString();
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
        it('check parameter', function () {
            expect(objArray.length).toEqual(2);
        });

    });
});
