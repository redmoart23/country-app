import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryService = inject(CountryService);

  countryResource = resource({
    request: () => ({ code: this.countryCode }),
    loader: async ({ request }) => {
      return await firstValueFrom(
        await this.countryService.searchByCountryAlphaCode(request.code)
      );
    },
  });
}
