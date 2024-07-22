import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
const serverConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig)],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
