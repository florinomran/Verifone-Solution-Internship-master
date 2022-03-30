import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent implements OnInit {
  currency: any;
  rate: any = 1;
  symbol: any = '$';

  constructor(private currencyService: CurrencyService) {
    this.currencyService.getCurrency().subscribe((res) => {
      this.currency = res;
      this.changeBaseToUsd();
    });
  }

  ngOnInit(): void {}

  changeBaseToUsd() {
    this.currency.rates.EUR /= this.currency.rates.USD;
    this.currency.rates.GBP *= this.currency.rates.EUR;
    this.currency.rates.RON *= this.currency.rates.EUR;
    this.currency.base = 'USD';
    this.currency.rates.USD = 1;
  }

  changeCurrency(currency : any) {
    this.rate = this.currency.rates[currency];
    if (currency == 'USD') {
      this.symbol = '$';
    } else if (currency == 'EUR') {
      this.symbol = '€';
    } else if (currency == 'GBP') {
      this.symbol = '£';
    } else if (currency == 'RON') {
      this.symbol = 'Lei';
      console.log(this.symbol);
    }
    console.log(this.currency.rates);
    console.log(this.currency.rates[currency]);
    console.log(this.symbol);
  }
}
