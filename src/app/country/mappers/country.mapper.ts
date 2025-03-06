import { Country } from '../interfaces/country.interface';
import { RestCountryResponse } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapperToCountry(resCountry: RestCountryResponse): Country {
    return {
      capital: resCountry.capital[0],
      cca2: resCountry.cca2,
      flag: resCountry.flags.png,
      flagSvg: resCountry.flags.svg,
      name: resCountry.translations['spa'].common,
      population: resCountry.population,
      region: resCountry.region,
      subRegion: resCountry.subregion,
    };
  }

  static mapperToCountries(resCountries: RestCountryResponse[]): Country[] {
    return resCountries.map(CountryMapper.mapperToCountry);
  }
}
