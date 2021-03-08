import { CartItem } from "app/models/cart-item.model";
import { ITransactionItem } from "./ITransactionItem";

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public ppItems: ITransactionItem[] = new Array<ITransactionItem>();
  public deliveryOptionId: string;
  public grossTotal: number = 0;
  public deliveryTotal: number = 0;
  public itemsTotal: number = 0;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.ppItems = src.ppItems;
    this.deliveryOptionId = src.deliveryOptionId;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }
}
