"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Item {
    constructor(name, price, description, quantity) {
        this.id = (0, uuid_1.v4)();
        this._name = name;
        this._price = price;
        this._description = description;
        this._quantity = quantity;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }
}
class User {
    constructor(name, age) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._age = age;
        this._cart = [];
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
    get cart() {
        return this._cart;
    }
    addToCart(item, quantity = 1) {
        const cartItem = this._cart.find((cartItem) => cartItem.id === item.id);
        if (cartItem) {
            cartItem.quantity += quantity;
        }
        else {
            item.quantity = quantity;
            this._cart.push(item);
        }
    }
    removeFromCart(item) {
        this._cart = this._cart.filter((cartItem) => cartItem.id !== item.id);
    }
    removeQuantityFromCart(item, quantity) {
        const existItem = this._cart.find((cartItem) => cartItem.id === item.id);
        if (existItem) {
            if (existItem.quantity <= quantity) {
                this.removeFromCart(existItem);
            }
            else {
                existItem.quantity -= quantity;
            }
        }
    }
    cartTotal() {
        let total = 0;
        for (const item of this._cart) {
            total += item.price * item.quantity;
        }
        return total;
    }
    printCart() {
        console.log("Here is your cart:");
        for (const item of this._cart) {
            console.log(`- ${item.quantity} ${item.name} with the price of $${item.price}`);
        }
    }
}
class Shop {
    constructor() {
        this._items = [];
    }
    get items() {
        return this._items;
    }
    addItem(item) {
        this._items.push(item);
    }
    removeItem(item) {
        this._items = this._items.filter((shopItem) => shopItem.id !== item.id);
    }
}
const shop = new Shop();
const itemA = new Item("Item A", 10, "Description A", 20);
const itemB = new Item("Item B", 15, "Description B", 30);
const itemC = new Item("Item C", 20, "Description C", 40);
shop.addItem(itemA);
shop.addItem(itemB);
shop.addItem(itemC);
const user = new User("Nhien Tran", 27);
user.addToCart(itemA, 3);
user.addToCart(itemB, 5);
user.printCart();
user.removeFromCart(itemA);
user.printCart();
user.removeQuantityFromCart(itemB, 3);
user.printCart();
let total = user.cartTotal();
console.log(`Total Price: $${total}`);
