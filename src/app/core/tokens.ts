import {InjectionToken} from "@angular/core";
import {AppStorageService} from "./services/app-storage-service";

export const APP_STORAGE_SERVICE = new InjectionToken<AppStorageService>('app.storage.service');
