import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Exchange } from '../../models/exchange';
import { ConverterService } from '../../services/converter.service';

@Component({
  selector: 'app-add-exchange',
  templateUrl: './add-exchange.component.html',
  styleUrl: './add-exchange.component.css',
})
export class AddExchangeComponent {
  constructor(private _fb: FormBuilder,private _matDialogRef:MatDialogRef<AddExchangeComponent>,private _converterService:ConverterService) {}

  exchangeForm = this._fb.group({
    from: this._fb.control(null, [Validators.required]),
    to: this._fb.control(null, [Validators.required]),
  });

  exchanges: string[] = [
    'AUD',
    'BGN',
    'BRL',
    'CAD',
    'CHF',
    'CNY',
    'CZK',
    'DKK',
    'EUR',
    'GBP',
    'HKD',
    'HRK',
    'HUF',
    'IDR',
    'ILS',
    'INR',
    'ISK',
    'JPY',
    'KRW',
    'MXN',
    'MYR',
    'NOK',
    'NZD',
    'PHP',
    'PLN',
    'RON',
    'RUB',
    'SEK',
    'SGD',
    'THB',
    'TRY',
    'USD',
    'ZAR',
  ];

  result:boolean = true;
  addExchange() {
    this.result = this._converterService.addNewExchange(this.exchangeForm.value as Exchange)
  }
}
