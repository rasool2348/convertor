import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddExchangeComponent } from './add-exchange-component/add-exchange.component';
import { Exchange } from '../models/exchange';
import { ConverterService } from '../services/converter.service';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
})
export class CurrencyConverterComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _converterService: ConverterService
  ) {}

  private _exchanges: Exchange[] = [];
  private _dialogRef: MatDialogRef<AddExchangeComponent> | null = null;
  private $userInput = new Subject<{
    from: string;
    to: string;
    value: string;
    index: number;
  }>();
  histories: string[] = [];

  @Input() set exchanges(value: Exchange[]) {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
    this._exchanges = value;
    this.currencyForm.controls.currencies.clear();
    this.reloadExchanges();
  }

  currencyForm = this._fb.group({
    currencies: this._fb.array<FormGroup>([]),
  });

  ngOnInit(): void {
    this.$userInput
      .pipe(
        switchMap((data) => {
          return this._converterService.exchange(
            data.from,
            data.to,
            data.value,
            data.index
          );
        })
      )
      .subscribe((result: any) => {
        let formElement = this.currencyForm.controls.currencies.at(
          result.index
        );
        if (formElement.controls['fromReadOnly'].value) {
          formElement.controls['from'].setValue(result.value);
        } else {
          formElement.controls['to'].setValue(result.value);
        }
        this.histories.push(
          `base currency: ${formElement.controls['fromLabel'].value} ` +
            formElement.controls['toLabel'].value +
            ' to: ' +
            formElement.controls['from'].value +
            ' = ' +
            result.value
        );
      });
  }

  reloadExchanges() {
    this._exchanges.forEach((unit) => {
      this.currencyForm.controls.currencies.push(
        this._fb.group({
          from: this._fb.control(null),
          fromLabel: this._fb.control(unit.from),
          fromReadOnly: this._fb.control(false),
          to: this._fb.control(null),
          toLabel: this._fb.control(unit.to),
          toReadOnly: this._fb.control(true),
        })
      );
    });
  }
  addExchange() {
    this._dialogRef = this._dialog.open(AddExchangeComponent);
  }

  exchange(from: string, to: string, value: string, index: number) {
    this.$userInput.next({ from, to, value, index });
  }
}
