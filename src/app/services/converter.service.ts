import { Injectable } from '@angular/core';
import { Exchange } from '../models/exchange';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  exchanges:Exchange[]=[
    {
      from:'ZAR',
      to:'USD'
    },
    {
      from:'AUD',
      to:'CHF'
    }
  ]

  constructor() { }

  addNewExchange(value:Exchange){
    if(this.exchanges.findIndex(el => el.from == value.from && el.to == value.to) == -1){
      this.exchanges.push(value);
      this.exchanges = this.exchanges.splice(0);
    }
  }
}
