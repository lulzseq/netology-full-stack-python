function check_simple(number) {

    if (number > 1) {
        for (let i = 2; i < number/2 + 1; i++) {
            if (number % i === 0) {
                return false
            }
        }
        return true
    } else {
        return false
    }
}

function func(n) {
    let arr = []
    let i = 2

    while (arr.length < n) {
        if (check_simple(i)) {
            arr.push(i)
        }
        i++
    }
    return arr
}

console.time()
console.log(func(process.argv[2]))
console.timeEnd()