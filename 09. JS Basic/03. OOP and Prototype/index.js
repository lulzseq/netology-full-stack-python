class Good {
    constructor (id, name, description, sizies, price, available) {
        this.id = id
        this.name = name
        this.description = description
        this.sizies = sizies
        this.price = price
        this.available = available
    }

    set setAvailable (value) {
        this.available = value
    }
}


class GoodsList {
    #goods;

    constructor (filter, sortPrice, sortDir) {
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        const resultList = this.#goods.filter((value) => this.filter.test(value.name))

        if (this.sortPrice) {
            if (this.sortDir) {
                return resultList.sort((prev, next) => (prev.price - next.price));
            }  else {
                return resultList.sort((prev, next) => (next.price - prev.price));
            }
        } else {
            return resultList;
        }
    }

    get listParams() {
        return `Filter: ${this.filter}, sort by price: ${this.sortDir ? "ascending" : "descending"}`
    }

    add (good) {
        this.#goods.push(good);
    }

    remove (id) {
        const _index = this.#goods.findIndex(value => value.id === id)
        if (_index != undefined) {
            this.#goods.splice(_index, 1);
        }
        return _index;
    }
}


class BasketGood extends Good {
    constructor (id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}


class Basket {
    constructor () {
        this.goods = []
    }

    get totalAmount () {
        return this.goods.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    }

    get totalSum () {
        let cost = 0;
        this.goods.forEach(item => cost += item.price * item.amount);
        return cost;
    }

    add (good, amount) {
        const _index = this.goods.findIndex(value => value.id === good.id)
        if (_index >= 0) {
            this.goods[_index].amount += amount;
        } else {
            const newBasketGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(newBasketGood);
        }
    }

    remove (good, amount=0) {
        const _index = this.goods.findIndex(value => value.id === good.id)
        if (_index >= 0) {
            if (this.goods[_index].amount - amount <= 0 || amount === 0){
                this.goods.splice(_index, 1);
            } else {
                this.goods[_index].amount -= amount;
            }
        } else {
            console.log(`Function Basket.remove: item with id = ${good.id} was not found`)
        }

    }

    removeUnavailable () {
        this.goods.filter(item => item.available === false).forEach(row => this.remove(row))
    }

    clear () {
        this.goods.length = 0;
    }

}


let good_1 = new Good(1, 'Телевизор', 'Описание телевизора', ['s', 'm'], 500, true)
let good_2 = new Good(2, 'Ноутбук', 'Описание ноутбука', ['s', 'm', 'l'], 1000, true)
let good_3 = new Good(3, 'Приставка', 'Описание приставки', ['m', 'l'], 700, true)
let good_4 = new Good(4, 'Монитор', 'Описание монитора', ['l'], 800, true)
let good_5 = new Good(5, 'Колонка', 'Описание колонки', ['s'], 200, true)

good_2.setAvailable = false;
good_5.setAvailable = false;

let catalog = new GoodsList(/Телевизор/, true, false);

catalog.add(good_1);
catalog.add(good_2);
catalog.add(good_3);
catalog.add(good_4);
catalog.add(good_5);

console.log(catalog.listParams);
console.log(catalog.list, '\n');

catalog.filter = /т/;
catalog.sortPrice = false;
console.log(catalog.listParams);
console.log(catalog.list, '\n');

catalog.sortPrice = true;
catalog.sortDir = true;
console.log(catalog.listParams);
console.log(catalog.list, '\n');

catalog.remove(1);
catalog.remove(3);

let basket = new Basket();

basket.add(good_1, 1);
basket.add(good_1, 2);
basket.add(good_3, 3);
basket.add(good_5, 1);
basket.add(good_2, 4);

console.log(`Total:\n- count: ${basket.totalAmount}\n- price: ${basket.totalSum}`);

basket.remove(good_3, 2);
basket.remove(good_3, 1);
basket.remove(good_4, 1);

basket.removeUnavailable();

basket.clear();