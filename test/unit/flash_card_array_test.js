/**
 * Created by Florenz on 17.03.16.
 */


describe('FlashCard Factory', function () {

    var DbFlashCardArray;
    var FlashCardArray = [];

    beforeEach(function () {

        DbFlashCardArray = [
            {question: 'Banana', answer: 'A j'},
            {question: 'Apple', answer: 'A j'},
            {question: 'Plum', ok: -2, answer: 'A j'},
            {
                question: 'Grape', ok: -2, answer: 'A berry growing in clusters on a grapevine'
            },
            {question: 'Orange', ok: -2, answer: 'A j'},
            {question: 'Pear', ok: -2, answer: 'A j'}
        ]
        ;
        for (var i = 0; DbFlashCardArray.length < i; i++) {
            FlashCardArray[i] = new FlashCard(DbFlashCardArray[i])
        }
        ;

    })
});
