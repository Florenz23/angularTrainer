/**
 * Created by Florenz on 17.03.16.
 */



function ClassFlashCard(flashCardObject) {
    this.init = function(){
        this.setId(flashCardObject);
        this.question = flashCardObject.question;
        this.setAnswer(flashCardObject);
        this.setAnswers(flashCardObject);
        this.poolStatus = this.setStartPoolStatus(flashCardObject.poolStatus);
        this.setLastRevision(flashCardObject);
        this.setRight(flashCardObject);
        this.setWrong(flashCardObject);
        this.setRating(flashCardObject);
        this.calculateImportance();
    };


    this.setId = function(object){
        if (object._id){
            this.id= object._id;
        }
        if (object.id){
            this.id= object.id;
        }
    };
    this.setAnswer = function(object){
        if (object.answer){
            this.answer = object.answer;
        } else {
            this.answer = false;
        }
    };
    this.setAnswers = function(object){
        if (object.answers){
            this.answers = object.answers;
        } else {
            this.answers = false;
        }
    };
    this.setLastRevision = function(object){
        if (object.lastRevision){
            this.lastRevision = object.lastRevision;
        } else {
            this.lastRevision = false;
        }
    };

    this.setRight = function (flashCardObject) {
        if (!isNaN(parseFloat(flashCardObject.right))) {
            this.right = flashCardObject.right;
        } else {
            this.right = 0;
        }
    };
    this.setWrong = function (flashCardObject) {
        if (!isNaN(parseFloat(flashCardObject.wrong))) {
            this.wrong = flashCardObject.wrong;
        } else {
            this.wrong = 0;
        }
    };
    this.setRating = function (flashCardObject) {
        if (!isNaN(parseFloat(flashCardObject.rating))) {
            this.rating = flashCardObject.rating;
        } else {
            this.rating = 0;
        }
    };

    this.setStartPoolStatus = function (poolStatus) {
        var start_pool_status = 1;
        var newPoolStatus;
        if (poolStatus == undefined) {
            newPoolStatus = start_pool_status;
        } else {
            newPoolStatus = poolStatus;
        }
        return newPoolStatus;
    };

    this.markAsCorrectAnswered = function () {
        if (this.poolStatus <= 0) {
            this.poolStatus++;
        }
        this.updateRight();
        this.updateData(1);
    };
    this.markAsWrongAnswered = function () {
        this.poolStatus = -1;
        this.updateWrong();
        this.updateData(0);
    };
    this.updateData = function (check) {
        this.calculateRating(check);
        this.calculateImportance();
        //this.updateDbFlashCard();
    };
    this.updateRight = function () {
        this.right++;
    };
    this.updateWrong = function () {
        this.wrong++;
    };
    this.calculateRating = function (correct) {
        if(this.poolStatus != 1){
            return;
        }
        var rating = this.rating;
        if (correct == 1) {
            rating++;
        }
        if (correct == 0) {
            if (rating > -1) {
                rating = -0.1 * rating - 1.1;
            }
        }
        this.rating = rating;
        //this.rating = Math.round(this.rating).toFixed(2);
        return rating;
    };
    this.calculateImportance = function () {
        var passed_time = (new Date().getTime() - this.lastRevision ) / (3600 * 24 * 1000); //in Tagen (!)
        this.importance = passed_time - (0.17 * Math.exp(1.4 * this.rating - 0.17));
        //this.importance = Math.round(this.importance).toFixed(6);
    }
    this.init();
}
