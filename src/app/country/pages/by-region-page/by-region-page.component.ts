import { Component } from '@angular/core';
import { CountryTableComponent } from "../../components/country-table/country-table.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryTableComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

}
