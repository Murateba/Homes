import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
const serverConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig), provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
