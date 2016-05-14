/**
 expect(testArray[i][2][0]).toEqual("Frage");
 expect(testArray['1002'][3][0][0]).toEqual(true);
 expect(testArray['1002'][3][0][1]).toEqual("Antwort1");
 * Created by Florenz on 13.05.16.
 */
function MultiChoiceFlashCard(arrayValue,counter) {

    this.setAnswer = function (arrayValue) {
        for (var i = 0; i < arrayValue[3].length; i++) {
            this.answer[i] = {
                "value": arrayValue[3][i][1],
                "false": arrayValue[3][i][0]
            }
        }
    };
    this.setId = function(counter){
       this.id = parseInt(counter);
    }

    this.ini = function (arrayValue,counter) {
        this.question = arrayValue[2][0];
        this.answer = [];
        this.setAnswer(arrayValue);
        this.setId(counter);
    };
    this.ini(arrayValue,counter);

}


function convertTrainerArray(trainerArray){
    var objArray = [];
    var counter = "1001";
    for (var i = 0; i < trainerArray.length - 1002; i++) {
        counter = parseInt(counter);
        counter++;
        counter = counter.toString();
        var obj = new MultiChoiceFlashCard(trainerArray[counter], counter);
        objArray[i] = obj;
    }
    return objArray;
};



