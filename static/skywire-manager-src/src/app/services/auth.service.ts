import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export enum AUTH_STATE {
  LOGIN_OK, LOGIN_FAIL, CHANGE_PASSWORD
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
  ) { }

  login(password: string) {
    return this.apiService.post('login', {pass: password})
      .pipe(
        tap(status => {
          if (status !== true) {
            throw new Error();
          }
        }),
      );
  }

  checkLogin(): Observable<AUTH_STATE> {
    return this.apiService.post('checkLogin', {}, {responseType: 'text'})
      .pipe(
        map(() => AUTH_STATE.LOGIN_OK),
        catchError(err => {
          if (err.error.includes('Unauthorized')) {
            return of(AUTH_STATE.LOGIN_FAIL);
          }

          if (err.error.includes('change password')) {
            return of(AUTH_STATE.CHANGE_PASSWORD);
          }
        })
      );
  }

  authToken(): Observable<string> {
    return this.apiService.post('checkLogin', {}, {responseType: 'text'});
  }

  changePassword(oldPass: string, newPass: string): Observable<boolean> {
    return this.apiService.post('updatePass', {oldPass, newPass}, {responseType: 'text'})
      .pipe(map(result => {
        if (result === 'true') {
          return true;
        } else {
          if (result === 'Please do not change the default password.') {
            throw new Error(this.translateService.instant('settings.password.errors.default-password'));
          }

          throw new Error(this.translateService.instant('settings.password.errors.bad-old-password'));
        }
      }));
  }
}
