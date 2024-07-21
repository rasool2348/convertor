import { Component } from '@angular/core';
import { ConverterService } from './services/converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'convertor';
  constructor(public converterService:ConverterService){}
}
