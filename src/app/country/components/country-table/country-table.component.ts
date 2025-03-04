import { Component, input } from '@angular/core';
import { RestCountryResponse } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'country-table',
  imports: [],
  templateUrl: './country-table.component.html',
})
export class CountryTableComponent {
  countries = input.required<RestCountryResponse[]>();
}
