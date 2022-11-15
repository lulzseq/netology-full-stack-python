let goods = [
    {
        name: 'Телевизор',
        description: 'Описание телевизора',
        sizies: ['small', 'medium', 'large'],
        price: 500,
        available: false,
    },
    {
        id: 2,
        name: 'Телефон',
        description: 'Описание телефона',
        sizies: ['small', 'large'],
        price: 300,
        available: true,
    },
    {
        id: 3,
        name: 'Ноутбук',
        description: 'Описание ноутбука',
        sizies: ['small', 'large'],
        price: 900,
        available: true,
    },
    {
        id: 4,
        name: 'Кондиционер',
        description: 'Описание кондиционера',
        sizies: ['medium', 'large'],
        price: 700,
        available: false,
    },
    {
        id: 5,
        name: 'Колонка',
        description: 'Описание колонки',
        sizies: ['small', 'medium'],
        price: 100,
        available: true,
    }
]


let basket = [
    {
        id: 1,
        name: 'Телевизор',
        description: 'Описание телевизора',
        sizies: ['small', 'medium', 'large'],
        price: 500,
        available: false,
    },
    {
        id: 2,
        name: 'Телефон',
        description: 'Описание телефона',
        sizies: ['small', 'large'],
        price: 300,
        available: true,
    }
]


let new_items = [
    {
        id: 1,
        name: 'Телевизор',
        description: 'Описание телевизора',
        sizies: ['small', 'medium', 'large'],
        price: 500,
        available: false,
    },
    {
        id: 6,
        name: 'Монитор',
        description: 'Описание монитора',
        sizies: ['small', 'medium', 'large'],
        price: 1000,
        available: true,
    },
    {
        id: 7,
        name: 'Игровая приставка',
        description: 'Описание игровой приставки',
        sizies: ['small', 'medium', 'large'],
        price: 200,
        available: false,
    }
]


function add_item(new_items) {
    for (let new_item in new_items) {
        for (let basket_item in basket) {
            if (new_items[new_item].id === basket[basket_item].id) {
                console.log('This item already has in the basket.')
                break
            } else {
                if (new_items[new_item].available === true) {
                    basket.push(new_items[new_item])
                    console.log('This item was successfully added to the basket.')
                } else {
                    console.log('This item is out of stock.')
                }
                break
            }
        }
    }
    return 'The basket was updated.'
}


console.log(add_item(new_items))

console.log()
console.log(get_basket_summary())


function delete_item(id) {
    for (let item in basket) {
        if (id === basket[item].id) {
            delete basket[item]
            return 'The item was deleted.'
        }
    }
    return 'This item is not in the basket.'
}

console.log()
console.log(delete_item(9))
console.log(delete_item(6))


function get_basket_summary() {
    let totalAmount = 0
    let totalSum = 0

    for (let item in basket) {
        totalAmount += 1
        totalSum += basket[item].price
    }
    return {'totalAmount': totalAmount, 'totalSum': totalSum}
}

console.log()
console.log(get_basket_summary())


function clear_basket() {
    if (basket) {
        for (let item in basket) {
            delete basket[item]
        }
    }
    return 'Your basket is empty.'
}

console.log()
console.log(clear_basket())