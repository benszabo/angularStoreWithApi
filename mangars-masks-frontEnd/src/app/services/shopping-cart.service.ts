import { Injectable } from "@angular/core";
import { StorageService } from "app/services/storage.service";
import { Observable ,  Observer } from "rxjs";
import { CartItem } from "../models/cart-item.model";
import { DeliveryOption } from "../models/delivery-option.model";
import { ITransactionItem } from "../models/ITransactionItem";
import { Product } from "../models/product.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { DeliveryOptionsDataService } from "./delivery-options.service";
import { ProductsDataService } from "./products.service";
import {IUnitAmount} from "../models/IUnitAmount";

const CART_KEY = "cart";

@Injectable()
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: Product[];
  private deliveryOptions: DeliveryOption[];

  public constructor(private storageService: StorageService,
                     private productService: ProductsDataService,
                     private deliveryOptionsService: DeliveryOptionsDataService) {
    this.storage = this.storageService.get();
    this.productService.all().subscribe((products) => this.products = products);
    this.deliveryOptionsService.all().subscribe((options) => this.deliveryOptions = options);

    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public addItem(product: Product, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);
    let ppItem = cart.ppItems.find((p) => p.name === product.name);
    if (item === undefined) {
      item = new CartItem();
      ppItem = new ITransactionItem();

      item.productId = product.id;
      ppItem.name = product.name;

      ppItem.unit_amount = new IUnitAmount();
      ppItem.unit_amount.value = product.price.toString();
      ppItem.unit_amount.currency_code = "USD";

      cart.items.push(item);
      cart.ppItems.push(ppItem);
    }

    if (quantity === -1) {
      item.quantity = 0;
      ppItem.quantity = "0";
    } else {
      item.quantity = 1;
      ppItem.quantity = "1";
    }

    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    // tslint:disable-next-line:no-shadowed-variable
    cart.ppItems = cart.ppItems.filter((ppItem) => Number(ppItem.quantity) > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
    }

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(deliveryOption: DeliveryOption): void {
    const cart = this.retrieve();
    cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private calculateCart(cart: ShoppingCart): void {
    cart.itemsTotal = cart.items
                          .map((item) => item.quantity * this.products.find((p) => p.id === item.productId).price)
                          .reduce((previous, current) => previous + current, 0);
    cart.deliveryTotal = cart.deliveryOptionId ?
                          this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
                          0;
    cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
  }

  private save(cart: ShoppingCart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }
}
