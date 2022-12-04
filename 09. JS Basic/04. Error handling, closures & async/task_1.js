function getPasswordChecker(password) {
    return function checker(correctPassword) {
        return (correctPassword === password)
    }
}

const checkPassword = getPasswordChecker('Abcd1234');

console.log(checkPassword('qwerty'));
console.log(checkPassword('Abcd1234'));
console.log(checkPassword('aBCD1234'));
