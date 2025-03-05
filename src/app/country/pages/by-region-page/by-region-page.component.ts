import { Component, signal } from '@angular/core';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryTableComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countries = signal<Country[]>([]);
}
