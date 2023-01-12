class Product {
    constructor(id, title, image) {
        this.id = id;
        this.title = title;
        this.image = image;
    }
}

class BasketProduct extends Product {
    constructor(id, title, image, quantity) {
        super(id, title, image);
        this.quantity = quantity;
    }
}

class Basket {

    #basketProducts;

    constructor(container) {
        this.container = container;
        this.cartProducts = this.container.querySelector('.cart__products');
        this.data = window.localStorage;
        this.#basketProducts = []
        this.readBasket();
    }

    readBasket() {
        const res = this.data.getItem(this.cartProducts.className);
        const activeProducts = res ? JSON.parse(res) : [];

        activeProducts.forEach(item => this.add({ id: item.id, title: item.title, image: item.image }, item.quantity));
    }

    saveBasket() {
        this.data.setItem(this.cartProducts.className, JSON.stringify(this.#basketProducts));
    }

    add(product, amount) {
        const _index = this.#basketProducts.findIndex(value => value.id === product.id)
        if (_index >= 0) {

            this.#basketProducts[_index].quantity += amount;

            const cartProduct = this.cartProducts.querySelector(`.cart__product[data-id="${product.id}"]`);

            cartProduct.querySelector('.cart__product-count').textContent = this.#basketProducts[_index].quantity;
        } else {
            const newBasketProduct = new BasketProduct(product.id, product.title, product.image, amount);
            this.#basketProducts.push(newBasketProduct);

            const newProduct = this.create(newBasketProduct);

            this.cartProducts.insertAdjacentElement('beforeEnd', newProduct);
            this.container.className = 'cart cart_active';
        }

        this.saveBasket();
    }

    remove(product, amount = 0) {
        const cartProduct = this.container.querySelector(`.cart__product[data-id="${product.id}"]`);
        const _index = this.#basketProducts.findIndex(value => value.id === product.id)

        if (_index >= 0) {
            if (this.#basketProducts[_index].quantity - amount <= 0 || amount === 0) {
                this.#basketProducts.splice(_index, 1);
                this.cartProducts.children[_index].remove();

                if (this.#basketProducts.length <= 0) {
                    this.container.className = 'cart';
                }
            } else {
                this.#basketProducts[_index].quantity -= amount;
                cartProduct.querySelector('.cart__product-count').textContent = this.#basketProducts[_index].quantity;
            }

            this.saveBasket();
        } else {
            console.log(`Функция Basket.remove: продукт id = ${product.id} не найден`)
        }
    }

    create(basketProduct) {

        const productElement = document.createElement('div');
        productElement.className = 'cart__product';
        productElement.dataset.id = basketProduct.id;

        const productImage = `<img class="cart__product-image" src="${basketProduct.image}">`;
        const productCount = `<div class="cart__product-count">${basketProduct.quantity}</div>`;

        productElement.insertAdjacentHTML('afterBegin', productImage);
        productElement.insertAdjacentHTML('beforeEnd', productCount);

        return productElement;
    }

}

class ListProduct extends Product {
    constructor(id, title, image, quantity, quantityMax = 10) {
        super(id, title, image);
        this.quantity = quantity;
        this.quantityMax = quantityMax;
    }
}

class ProductsList {

    #products;

    constructor(container) {
        this.#products = [];
        this.container = container;
        this.basket = new Basket(document.querySelector('.cart'));
        this.listProducts = Array.from(this.container.querySelectorAll('.product'));

        this.listProducts.forEach(element => {
            const id = element.dataset.id;
            const title = element.querySelector('.product__title').textContent.trim();
            const image = element.querySelector('.product__image').src;
            const quantity = element.querySelector('.product__quantity-value').textContent.trim();
            const newProduct = new ListProduct(id, title, image, quantity);
            this.add(newProduct);
        });

        this.registerEvents();
    }

    add(product) {
        this.#products.push(product);
    }

    registerEvents() {
        const container = this.container;

        this.#products.forEach((item) => {
            const product = container.querySelector(`.product[data-id="${item.id}"]`);
            const quantityInc = product.querySelector('.product__quantity-control_inc');
            const quantityDec = product.querySelector('.product__quantity-control_dec');
            const quantityValue = product.querySelector('.product__quantity-value');
            const productAdd = product.querySelector('.product__add');
            const productRemove = product.querySelector('.product__remove');

            quantityDec.addEventListener('click', () => {
                if (--item.quantity < 1) {
                    item.quantity = 1;
                }

                quantityValue.textContent = item.quantity;
            });

            quantityInc.addEventListener('click', () => {
                if (++item.quantity > item.quantityMax) {
                    item.quantity = item.quantityMax;
                }

                quantityValue.textContent = item.quantity;
            });

            productAdd.addEventListener('click', () => {
                this.basket.add({ id: item.id, title: item.title, image: item.image }, Number(item.quantity));
            });

            productRemove.addEventListener('click', () => {
                this.basket.remove({ id: item.id, title: item.title, image: item.image }, Number(item.quantity));
            });
        })
    }
}

new ProductsList(document.querySelector('.products'));