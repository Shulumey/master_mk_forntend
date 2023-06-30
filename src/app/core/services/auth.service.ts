import {Inject, Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {User} from "../../shared/model/user";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import {AppStorageService} from "./app-storage-service";
import {APP_STORAGE_SERVICE} from "../tokens";
import {HttpService} from "./http.service";
import {API_URLS} from "../constants/api.urls";
import {JwtHelperService} from "@auth0/angular-jwt";
import {APP_ROUTES} from "../constants/app.routes";

const defaultPath = '/';
const userKey = "master_mk_user";
@Injectable()
export class AuthService {

  private userSub$;

  public get user$(): Observable<User | null> {
    return this.userSub$.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.userSub$.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }


  constructor(private router: Router,
              private httpService: HttpService,
              private jwtHelper: JwtHelperService,
              @Inject(APP_STORAGE_SERVICE) private appStoreService: AppStorageService) {
    this.userSub$ = new BehaviorSubject<User | null>(this.appStoreService.get<User>(userKey))
  }

  logIn(login: string, password: string) {
     this.httpService.post<string>(API_URLS.LOGIN, {user: login, password},token=>{
        let user = this.jwtHelper.decodeToken<User>(token);
        this.userSub$.next(user);
        this.appStoreService.set(userKey, user);
     });
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(userName: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this.userSub$.next(null);
    await this.router.navigate([APP_ROUTES.LOGIN]);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
