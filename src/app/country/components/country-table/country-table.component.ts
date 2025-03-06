import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-table',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-table.component.html',
})
export class CountryTableComponent {
  countries = input.required<Country[]>();

  errorMesssage = input<string | null | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
