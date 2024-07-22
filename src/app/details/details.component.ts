import { Component, inject, NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import { HousingLocation } from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { BooleanToYesNoPipe } from '../booleanToYesNo.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { faSocks } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, BooleanToYesNoPipe],
  template: `
  <article>
    <img
      class="listing-photo"
      [src]="'assets/img/' + housingLocation?.id + '.jpg'"
      alt="Exterior photo of {{ housingLocation?.name }}"
      crossorigin
    />
    <section class="listing-description">
      <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
      <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li><fa-icon [icon]="faBed" id="primary-color"></fa-icon><strong id="primary-color"> Units</strong> {{  housingLocation?.units }}</li>
        <li><fa-icon [icon]="faWifi" id="primary-color"></fa-icon><strong id="primary-color"> Wi-Fi</strong> {{ housingLocation?.wifi | booleanToYesNo }}</li>
        <li><fa-icon [icon]="faSocks" id="primary-color"></fa-icon><strong id="primary-color"> Laundry</strong> {{ housingLocation?.laundry | booleanToYesNo }}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName" />
        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName" />
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email" />
        <button type="submit" class="primary">Apply now</button>
      </form>
    </section>
  </article>
`,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

faWifi = faWifi
faSocks = faSocks
faBed = faBed

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}