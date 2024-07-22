import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { getDoc, doc, getDocs } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  homes$: Observable<HousingLocation[]>;

  constructor() {
    // get a reference to the user-profile collection
    const homesCollection = collection(this.firestore, 'homes');
    this.homes$ = collectionData(homesCollection) as Observable<
      HousingLocation[]
    >;
  }
  url = 'http://localhost:3000/locations';
  async getAllHousingLocations(): Promise<Observable<HousingLocation[]>> {
    return this.homes$;
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
    return this.homes$;
  }
  async getHousingLocationById(
    id: number,
  ): Promise<HousingLocation | undefined> {
    let result: HousingLocation | undefined;

    try {
      const homesArray = await firstValueFrom(this.homes$);

      result = homesArray.find((home) => home.id === id);
    } catch (error) {
      console.error('Error fetching homes:', error);
    }
    return result;
  }
}
