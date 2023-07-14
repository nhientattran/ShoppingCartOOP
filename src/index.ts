import { v4 as uuidv4 } from "uuid";

class Item {
  public id: string
  private _name: string
  private _price: number
  private _description: string
  private _quantity: number

  constructor(name: string, price: number, description: string, quantity: number) {
    this.id = uuidv4()
    this._name = name
    this._price = price
    this._description = description
    this._quantity = quantity
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get price(): number {
    return this._price;
  }

  public set price(value: number) {
    this._price = value;
  }

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(value: number) {
    this._quantity = value;
  }
}

class User {
  private _id: string
  private _name: string
  private _age: number
  private _cart: Item[]

  constructor(name: string, age: number) {
    this._id = uuidv4()
    this._name = name
    this._age = age
    this._cart = []
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    this._age = value;
  }

  public get cart(): Item[] {
    return this._cart;
  }

  public addToCart(item: Item, quantity: number = 1): void {
    const cartItem = this._cart.find((cartItem) => cartItem.id === item.id)
    if (cartItem) {
      cartItem.quantity += quantity
    } else {
      item.quantity = quantity
      this._cart.push(item)
    }
  }

  public removeFromCart(item: Item): void {
    this._cart = this._cart.filter((cartItem) => cartItem.id !== item.id)
  }

  public removeQuantityFromCart(item: Item, quantity: number): void {
    const existItem = this._cart.find((cartItem) => cartItem.id === item.id)
    if (existItem) {
      if (existItem.quantity <= quantity) {
        this.removeFromCart(existItem)
      } else {
        existItem.quantity -= quantity
      }
    }
  }

  public cartTotal(): number {
    let total = 0
    for (const item of this._cart) {
      total += item.price * item.quantity
    }
    return total
  }

  public printCart(): void {
    console.log("Here is your cart:")
    for (const item of this._cart) {
      console.log(`- ${item.quantity} ${item.name} with the price of $${item.price}`)
    }
  }
}

class Shop {
  private _items: Item[]

  constructor() {
    this._items = []
  }

  public get items(): Item[] {
    return this._items
  }

  public addItem(item: Item): void {
    this._items.push(item)
  }

  public removeItem(item: Item): void {
    this._items = this._items.filter((shopItem) => shopItem.id !== item.id)
  }
}

const shop = new Shop()

const itemA = new Item("Item A", 10, "Description A", 20)
const itemB = new Item("Item B", 15, "Description B", 30)
const itemC = new Item("Item C", 20, "Description C", 40)

shop.addItem(itemA)
shop.addItem(itemB)
shop.addItem(itemC)

const user = new User("Nhien Tran", 27)

user.addToCart(itemA, 3)
user.addToCart(itemB, 5)

user.printCart()

user.removeFromCart(itemA)
user.printCart()

user.removeQuantityFromCart(itemB, 3)
user.printCart()

let total = user.cartTotal()
console.log(`Total Price: $${total}`)
