import {IUnitAmount} from "./IUnitAmount";

export class ITransactionItem {
  public name: string;
  // tslint:disable-next-line:variable-name
  public unit_amount: IUnitAmount;
  public quantity: string;
}
