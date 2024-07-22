/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {
  bootstrapApplication,
  provideProtractorTestingSupport,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {
  provideStorage,
  getStorage,
  getDownloadURL,
} from '@angular/fire/storage';
import { app } from './app/firebase';
bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideFirebaseApp(() => initializeApp(app)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
}).catch((err) => console.error(err));
