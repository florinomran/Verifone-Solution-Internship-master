import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  endpoint = 'latest';
  access_key = 'dae9388d8b34bb2274d46eb33e40ca51';
  url = 'http://data.fixer.io/api/';

  constructor(private http: HttpClient) { }

  getCurrency() {
    return this.http
      .get<any>(this.url + this.endpoint + '?access_key=' + this.access_key)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
