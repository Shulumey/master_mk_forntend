import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, Observable} from "rxjs";
import {License} from "../../shared/model/license";
import {HttpService} from "./http.service";
import {API_URLS} from "../constants/api.urls";

@Injectable({
  providedIn:"root"
})
export class AppInfoService {

  private licenseSub$: BehaviorSubject<License | null>;

  constructor(private httpService: HttpService) {
    this.licenseSub$ = new BehaviorSubject<License | null>(null);
  }

  public get title() {
    return 'Master MK';
  }

  public get license(): License | null {
    return this.licenseSub$.value;
  }

  public onLicenseReceived(): Observable<License | null> {
    return this.licenseSub$.asObservable();
  }
  get hasLicense(): boolean {
    return !!this.license;
  }

  loadLicense() {
    if(!this.hasLicense) {
      this.httpService.get<License>(API_URLS.LICENSE)
        .subscribe((license) => {
          this.licenseSub$.next(license);
        });
    }
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
