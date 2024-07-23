import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Length } from '../models/exchange';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrl: './length-converter.component.css'
})
export class LengthConverterComponent {
  constructor(private _fb:FormBuilder){}

  private _units:Length[] = [
    {
      from:'METER',
      to:'YARD'
    },
    {
      from:'METER',
      to:'INCH'
    },
    {
      from:'YARD',
      to:'INCH'
    },
    {
      from:'INCH',
      to:'YARD'
    },
    {
      from:'INCH',
      to:'METER'
    },
    {
      from:'YARD',
      to:'METER'
    }
  ];

  lengthForm = this._fb.group({
    units: this._fb.array<FormGroup>([])
  });

  

  ngOnInit(): void {
    this.reloadUnits();
  }

  reloadUnits(){
    this._units.forEach(unit => {
      this.lengthForm.controls.units.push(
        this._fb.group({
          from:this._fb.control(null),
          fromLabel:this._fb.control(unit.from),
          fromReadOnly:this._fb.control(false),
          to:this._fb.control(null),
          toLabel:this._fb.control(unit.to),
          toReadOnly:this._fb.control(true),
        }),
      )
    })
  }

  convert(from:string,to:string,value:string,index:number){ //based on the documentation
    let result:string = '';
    if(from == 'YARD' && to == 'INCH'){
      result = (+value * 324 / 9).toFixed(2) + ' in';
    }
    else if(from == 'YARD' && to == 'METER'){
      result = (+value * 324 / 9 * 500 / 12.7).toFixed(2) + ' m';
    }
    else if(from == 'METER' && to == 'INCH'){
      result = (+value * 500 / 12.7).toFixed(2) + ' in';
    }
    else if(from == 'METER' && to == 'YARD'){
      result = (+value * 500 / 12.7 * 9 / 324).toFixed(2) + ' yd';
    }
    else if(from == 'INCH' && to == 'YARD'){
      result = (+value * 9 / 324).toFixed(2) + ' yd';
    }
    else if(from == 'INCH' && to == 'METER'){
      result = (+value * 12.7 / 500).toFixed(2) + ' m';
    }
    let formElement =  this.lengthForm.controls.units.at(index);
    if(formElement.controls['fromReadOnly'].value){
      formElement.controls['from'].setValue(result)
    }else{
      formElement.controls['to'].setValue(result)
    }
  }
}
