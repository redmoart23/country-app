import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountryService } from '../../services/country.service';
import { RestCountryResponse } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryTableComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  query = signal('');

  //observables
  // countryResource = rxResource({
  //   request: () => ({ query: this.query() }),
  //   loader: ({ request }) => {
  //     if (!request.query) return of([]);

  //     return this.countryService.searchByCapital(request.query)
  //   },
  // });


  //promises
  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];

      return await firstValueFrom(
        await this.countryService.searchByCapital(request.query)
      );
    },
  });

  // isLoading = signal(false);
  // hasError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // async onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.hasError.set(null);

  //   (await this.countryService.searchByCapital(query)).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (error) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.hasError.set(error.message);
  //     },
  //   });
  // }
}
