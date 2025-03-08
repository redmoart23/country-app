import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountryResponse } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  async searchByCapital(query: string): Promise<Observable<Country[]>> {
    const term = query.trim().toLowerCase();

    if (this.queryCacheCapital.has(term)) {
      return of(this.queryCacheCapital.get(term)!);
    }

    const response = this.http.get<RestCountryResponse[]>(
      `${API_URL}/capital/${term}`
    );

    return response.pipe(
      map((resp) => CountryMapper.mapperToCountries(resp)),
      tap((countries) => this.queryCacheCapital.set(term, countries)),
      catchError((error) => {
        console.error('Error fetching countries:', error);
        return throwError(() => new Error(`No matches found for ${query}`));
      })
    );
  }

  async searchByCountry(query: string): Promise<Observable<Country[]>> {
    const term = query.trim().toLowerCase();

    if (this.queryCacheCountry.has(term)) {
      return of(this.queryCacheCountry.get(term)!);
    }

    const response = this.http.get<RestCountryResponse[]>(
      `${API_URL}/name/${term}`
    );

    return response.pipe(
      map((resp) => CountryMapper.mapperToCountries(resp)),
      tap((countries) => this.queryCacheCountry.set(term, countries)),
      catchError((error) => {
        console.error('Error fetching countries:', error);
        return throwError(() => new Error(`No matches found for ${query}`));
      })
    );
  }

  async searchByRegion(query: string): Promise<Observable<Country[]>> {
    const term = query.trim().toLowerCase();

    if (this.queryCacheRegion.has(term)) {
      return of(this.queryCacheRegion.get(term)!);
    }

    const response = this.http.get<RestCountryResponse[]>(
      `${API_URL}/region/${term}`
    );
    return response.pipe(
      map((resp) => CountryMapper.mapperToCountries(resp)),
      tap((countries) => this.queryCacheRegion.set(term, countries)),
      catchError((error) => {
        console.error('Error fetching countries:', error);
        return throwError(() => new Error(`No matches found for ${query}`));
      })
    );
  }

  async searchByCountryAlphaCode(code: string) {
    const response = this.http.get<RestCountryResponse[]>(
      `${API_URL}/alpha/${code}`
    );
    return response.pipe(
      map((resp) => CountryMapper.mapperToCountries(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.error('Error fetching countries:', error);
        return throwError(() => new Error(`No matches found for code ${code}`));
      })
    );
  }
}
