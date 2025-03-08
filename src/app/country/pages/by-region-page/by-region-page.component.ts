import { Component, inject, output, resource, signal } from '@angular/core';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryTableComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  //--- ByRegionPageComponent

  countries = signal<Country[]>([]);
  countryService = inject(CountryService);
  selectedRegion = signal<Region | null>(null);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = resource({
    request: () => ({ region: this.selectedRegion() }),
    loader: async ({ request }) => {
      if (!request.region) return [];

      return await firstValueFrom(
        await this.countryService.searchByRegion(request.region)
      );
    },
  });
}
