import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddExchangeComponent } from './add-exchange-component/add-exchange.component';
import { Exchange } from '../models/exchange';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent implements OnInit{

  constructor(private _fb:FormBuilder,private _dialog:MatDialog){}

  private _exchanges:Exchange[] = [];
  private _dialogRef:MatDialogRef<AddExchangeComponent> | null = null;
  @Input() set exchanges(value:Exchange[]){
    if(this._dialogRef){
      this._dialogRef.close();
    }
    this._exchanges = value;
    this.currencyForm.controls.currencies.clear();
    this.reloadExchanges();

  }

  currencyForm = this._fb.group({
    currencies: this._fb.array<FormGroup>([])
  });

  

  ngOnInit(): void {
    //this.reloadExchanges();
  }

  reloadExchanges(){
    this._exchanges.forEach(unit => {
      this.currencyForm.controls.currencies.push(
        this._fb.group({
          from:this._fb.control(0,[Validators.required]),
          fromLabel:this._fb.control(unit.from),
          fromReadOnly:this._fb.control(false),
          to:this._fb.control(0),
          toLabel:this._fb.control(unit.to),
          toReadOnly:this._fb.control(true),
        }),
      )
  })
  }
  addExchange(){
    this._dialogRef = this._dialog.open(AddExchangeComponent)
  }
}
