function check_simple(number) {
    let flag = false
    for (let i = 2; number/2 + 1; i++) {
        if (number % i == 0) {
            flag = true
            return false
        }
    if (!flag) {
        return true
    }
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