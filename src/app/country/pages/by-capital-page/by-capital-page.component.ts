import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryTableComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);

  //promises
  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      console.log({ query: request.query });

      if (!request.query) return [];

      this.router.navigate(['/country/by-capital'], {
        queryParams: { query: request.query },
      });

      return await firstValueFrom(
        await this.countryService.searchByCapital(request.query)
      );
    },
  });

  //observables
  // countryResource = rxResource({
  //   request: () => ({ query: this.query() }),
  //   loader: ({ request }) => {
  //     if (!request.query) return of([]);

  //     return this.countryService.searchByCapital(request.query)
  //   },
  // });

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
