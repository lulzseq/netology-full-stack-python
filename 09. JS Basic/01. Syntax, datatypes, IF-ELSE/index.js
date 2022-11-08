let numberToGuess = Math.floor(Math.random() * 1000)
console.log(numberToGuess)

let numberFromUser = prompt('Введите ваше число:')

while (isNaN(numberFromUser)) {
    numberFromUser = prompt('Неверный тип. Введите новое число:')
}

while (true) {
    if (+numberFromUser > numberToGuess) {
        numberFromUser = prompt('Ваше число больше загаданного. Введите новое число:')
        while (isNaN(numberFromUser)) {
            numberFromUser = prompt('Неверный тип. Введите новое число:')
        }
    } else if (+numberFromUser < numberToGuess) {
        numberFromUser = prompt('Ваше число меньше загаданного. Введите новое число:')
        while (isNaN(numberFromUser)) {
            numberFromUser = prompt('Неверный тип. Введите новое число:')
        }
    } else if (+numberFromUser === numberToGuess) {
        alert('Вы угадали')
        break
    }
}