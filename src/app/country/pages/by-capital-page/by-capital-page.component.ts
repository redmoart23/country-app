import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountryService } from '../../services/country.service';
import { RestCountryResponse } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryTableComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  isLoading = signal(false);
  hasError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  async onSearch(query: string) {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.hasError.set(null);

    (await this.countryService.searchByCapital(query)).subscribe(
      (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      }
    );
  }
}
