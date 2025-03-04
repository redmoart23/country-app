import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountryResponse } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable } from 'rxjs';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  async searchByCapital(query: string): Promise<Observable<Country[]>> {
    const term = query.trim().toLowerCase();

    const response = this.http.get<RestCountryResponse[]>(
      `${API_URL}/capital/${term}`
    );

    return response.pipe(map(CountryMapper.mapperToCountries));
  }
}
