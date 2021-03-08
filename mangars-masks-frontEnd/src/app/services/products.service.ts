import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Product } from "app/models/product.model";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { RestService } from "../app.service";
import { CachcingServiceBase } from "./caching.service";

@Injectable()
export class ProductsDataService extends CachcingServiceBase {
  private products: Observable<Product[]>;

  public constructor(private http: Http, private restService: RestService) {
    super();
  }

  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
      (val: Observable<Product[]>) => this.products = val,
      () => this.restService.getMasks());
  }
}
