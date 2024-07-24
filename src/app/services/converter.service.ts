import { Injectable } from '@angular/core';
import { Exchange } from '../models/exchange';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export const BASE_URL =
  'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_pxorgBrvho7KR0Et7saJpB8K3LX94rr3HZ7CXjMD';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  exchanges: Exchange[] = [
    {
      from: 'ZAR',
      to: 'USD',
    },
    {
      from: 'AUD',
      to: 'CHF',
    },
  ];

  constructor(private _http: HttpClient) {}

  addNewExchange(value: Exchange): boolean {
    if (
      this.exchanges.findIndex(
        (el) => el.from == value.from && el.to == value.to
      ) == -1
    ) {
      this.exchanges.push(value);
      this.exchanges = this.exchanges.splice(0);
      return true;
    }
    return false;
  }

  exchange(from: string, to: string, value: string, index: number) {
    return this._http
      .get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_pxorgBrvho7KR0Et7saJpB8K3LX94rr3HZ7CXjMD&currencies=${to}&base_currency=${from}`
      )
      .pipe(
        map((res: any) => {
          return {
            index: index,
            value: this.checkSymbol(to) + (+value * res.data[to]).toFixed(2),
          };
        })
      );
  }

  checkSymbol(currency: string) {
    switch (currency) {
      case 'HRK':
        return 'kn';
      case 'HUF':
        return 'Ft';
      case 'IDR':
        return 'Rp';
      case 'ILS':
        return '₪';
      case 'INR':
        return '';
      case 'ISK':
        return 'kr';
      case 'JPY':
        return '¥';
      case 'KRW':
        return '₩';
      case 'MXN':
        return '$';
      case 'MYR':
        return 'RM';
      case 'NOK':
        return 'kr';
      case 'NZD':
        return '$';
      case 'PHP':
        return '₱';
      case 'PLN':
        return 'zł';
      case 'RON':
        return 'lei';
      case 'RUB':
        return '₽';
      case 'SEK':
        return 'kr';
      case 'SGD':
        return '$';
      case 'THB':
        return '฿';
      case 'TRY':
        return '';
      case 'USD':
        return '$';
      default:
        return 'R';
    }
  }
}
