import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housinglocation';
import {HousingService} from '../housing.service';
import { Firestore, collection, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, FontAwesomeModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)"><fa-icon [icon]="faMagnifyingGlass"></fa-icon></button>
      </form>
    </section>
    <section class="results">
    <app-housing-location *ngFor="let housingLocation of filteredLocationList | async" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faMagnifyingGlass = faMagnifyingGlass
  filteredLocationList!: Observable<HousingLocation[]>;
  housingLocationList!: Observable<HousingLocation[]>
  housingService: HousingService = inject(HousingService);
  constructor() {
      this.housingService.getAllHousingLocations().then((housingLocationList: Observable<HousingLocation[]>) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      console.log(this.filteredLocationList);
      return;
    }
    this.filteredLocationList = this.housingLocationList;
    this.housingLocationList.forEach(function(house){
      console.log(house)
    })
  }
}
