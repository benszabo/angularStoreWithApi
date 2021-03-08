import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {Product} from "./models/product.model";

const endpoint = "http://localhost:8080/api/v1/";
const httpOptions = {
  headers: new Headers({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class RestService {

  constructor(private http: Http) {
  }

  public getMasks(): Observable<Product[]> {
    return this.http.get(endpoint + "masks").pipe(
      map((response) => response.json()
        .map((item) => {
          let model = new Product();
          model.updateFrom(item);
          return model;
        })));
  }

  public getMask(id): Observable<Product> {
    return this.http.get(endpoint + "masks/" + id).pipe(
      map((response) => response.json()
        .map((item) => {
          let model = new Product();
          model.updateFrom(item);
          return model;
        })));
  }

  public addMask(mask): Observable<Product> {
    console.log(mask);
    return this.http.post(endpoint + "masks", JSON.stringify(mask), httpOptions).pipe(
      tap((_) => console.log(`added mask w/ id=${mask.id}`)),
      catchError(this.handleError<any>("addMask")),
      map((response) => response.json()
        .map((item) => {
          let model = new Product();
          model.updateFrom(item);
          return model;
        })));
  }

  public updateMask(id, mask): Observable<Product> {
    return this.http.put(endpoint + "mask/" + id, JSON.stringify(mask), httpOptions).pipe(
      tap((_) => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>("updateMask")),
      map((response) => response.json()
        .map((item) => {
          let model = new Product();
          model.updateFrom(item);
          return model;
        })));
  }

  public deleteMask(id): Observable<Product> {
    return this.http.delete(endpoint + "masks/" + id).pipe(
      tap((_) => console.log(`deleted mask id=${id}`)),
      catchError(this.handleError<any>("deleteMask")));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
