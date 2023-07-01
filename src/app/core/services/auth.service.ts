import {Inject, Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {User} from "../../shared/model/user";
import {BehaviorSubject, Observable} from "rxjs";
import {AppStorageService} from "./app-storage-service";
import {HttpService} from "./http.service";
import {API_URLS} from "../constants/api.urls";
import {JwtHelperService} from "@auth0/angular-jwt";
import {APP_ROUTES} from "../constants/app.routes";
import {APP_STORAGE_SERVICE} from "../inject.tokens";
import {UserRegistration} from "../../shared/model/user.registration";

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

  private _lastAuthenticatedPath: string = APP_ROUTES.ROOT;
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
    let user = this.appStoreService.get<User | null | undefined>(userKey);
    if (user === null || user === undefined) {
      this.httpService.post<string>(API_URLS.LOGIN, {user: login, password}, token => {
        let user = this.jwtHelper.decodeToken<User>(token);
        this.userSub$.next(user);
        this.appStoreService.set(userKey, user);
      });
    } else {
      this.userSub$.next(user);
    }
  }

  createAccount(registration: UserRegistration) {
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

  changePassword(userName: string, newPassword: string) {
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

  logOut() {
    this.userSub$.next(null);
    this.router.navigate([APP_ROUTES.LOGIN]);
  }

  getToken(): string | null {
    return this.currentUserValue?.token || null;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn;
    const isAuthForm = [
      APP_ROUTES.LOGIN,
      APP_ROUTES.CREATE_ACCOUNT,
      APP_ROUTES.CHANGE_PASSWORD
    ].includes(route.routeConfig?.path || APP_ROUTES.ROOT);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = APP_ROUTES.ROOT;
      this.router.navigate([APP_ROUTES.ROOT]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate([APP_ROUTES.LOGIN]);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || APP_ROUTES.ROOT;
    }

    return isLoggedIn || isAuthForm;
  }
}
