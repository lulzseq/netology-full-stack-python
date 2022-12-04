const { resolve } = require('path');
const textGame = 'Try to guess the number from 0 to 999.';
const textMainQuestion = 'Input the number: ';

let textQuestion = (attempt, description=textMainQuestion) => {return `Attempt №${attempt}. ${description}`};
let rl = require('readline').createInterface(process.stdin, process.stdout);    

function getNextAttempt(attempt=0) {

    let next_attempt = attempt;
    return function increment() {
        next_attempt++;
        return next_attempt;
    }
}


function question(text) {
    return new Promise((resolve, data) => {
        rl.question(text, (data) => {
            resolve(data);
        })
    })
}

async function getAnswer(text) {

    while (true) {
        const answer = await question(text);
        let exit = false;

        let answer_text = '';
        console.log('Hint: ', answer, randomNumber);
        
        if (isNaN(answer)) {
            answer_text = 'NaN';
            exit = true;
        } else if (answer == randomNumber) {
            answer_text = `You are winner, the target number is: ${answer}`;
            exit = true;
        } else {
    
            if (answer > randomNumber) {
                answer_text = `Target number less than yours: ${answer}`;
            } else if (answer < randomNumber) {
                answer_text = `Target number bigger than yours: ${answer}`;
            }    
        }

        console.log(answer_text);

        if (exit) {
            rl.close();
            break;
        } else {
            text = textQuestion(nextAttempt());
        }    
    }
}

const nextAttempt = getNextAttempt();
const randomNumber = Math.floor(Math.random() * 1000);
console.log(textGame);
getAnswer(textQuestion(nextAttempt()));