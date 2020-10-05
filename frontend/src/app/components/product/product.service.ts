import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products';

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"]
    });
  }

  create(product: Product): Observable<Product> {
    // Pipe combina duas funções em uma só, essa por exemplo executa  post e já faz o map em sequencia.
    return this.httpClient.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj), // faço um map aqui para conseguir usar o catchError.
      catchError((error) => this.handleError(error)) // passo em arrow function pra garantir que o this vai chamar esta classe.
    );
  }

  read(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj), // faço um map aqui para conseguir usar o catchError.
      catchError((error) => this.handleError(error)) // passo em arrow function pra garantir que o this vai chamar esta classe.
    );
  }

  readById(id: number): Observable<Product> {
    const url = this.baseUrl + '/' + id; // interpolação não deu certo, ficava o id + "%7D".
    return this.httpClient.get<Product>(url).pipe(
      map((obj) => obj), // faço um map aqui para conseguir usar o catchError.
      catchError((error) => this.handleError(error)) // passo em arrow function pra garantir que o this vai chamar esta classe.
    );
  }

  update(product: Product): Observable<Product> {
    const url = this.baseUrl + '/' + product.id; // interpolação não deu certo, ficava o id + "%7D".
    return this.httpClient.put<Product>(url, product).pipe(
      map((obj) => obj), // faço um map aqui para conseguir usar o catchError.
      catchError((error) => this.handleError(error)) // passo em arrow function pra garantir que o this vai chamar esta classe.
    );
  }

  delete(id: number): Observable<Product> {
    const url = this.baseUrl + '/' + id; // interpolação não deu certo, ficava o id + "%7D".    
    return this.httpClient.delete<Product>(url).pipe(
      map((obj) => obj), // faço um map aqui para conseguir usar o catchError.
      catchError((error) => this.handleError(error)) // passo em arrow function pra garantir que o this vai chamar esta classe.
    );
  }

  handleError(error: any): Observable<any> {
    this.showMessage('Ocorreu um erro, motivo: ' + error.statusText, true);
    return EMPTY; // Retorna um observer vazio no caso de acontecer um erro.
  }
  
}