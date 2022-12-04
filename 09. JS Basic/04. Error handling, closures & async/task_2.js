let readline = require('readline');
const textGame = 'Try to guess the number from 0 to 999.';
const textMainQuestion = 'Input the number: ';
let currentAttempt = 1;
let textQuestion = (attempt, description=textMainQuestion) => {return `Attempt №${attempt}. ${description}`};
const fs = require("fs");
let rl = readline.createInterface(process.stdin, process.stdout);
const n = Math.floor(Math.random() * 1000);


console.log(textGame);

rl.setPrompt(textQuestion(currentAttempt));
rl.prompt();

rl.on('line', (answer) => {
    currentAttempt++;

    let text = '';
    let exit = false;

    if (isNaN(answer)) {
        text = 'NaN';
        exit = true;
    } else if (answer == n) {
        text = `You are winner, the target number is: ${answer}`;
        exit = true;
    } else if (answer > n) {
        text = `Target number less than yours: ${answer}\n${textQuestion(currentAttempt)}`;
    } else if (answer < n) {
        text = `Target number bigger than yours: ${answer}\n${textQuestion(currentAttempt)}`;
    }

    console.log(text);
});