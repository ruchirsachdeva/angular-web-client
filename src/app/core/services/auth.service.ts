import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {JsonHttp} from "./";
import {User} from "../domains";

const jwtDecode = require('jwt-decode');

@Injectable()
export class AuthService {

  private authEvents: Subject<AuthEvent>;

  constructor(private http: JsonHttp) {
    this.authEvents = new Subject<AuthEvent>();
  }

  login(email: string, password: string): Observable<Response> {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post('/api/auth', body).do((resp: Response) => {
      localStorage.setItem('jwt', resp.json().token);
      this.authEvents.next(new DidLogin());
    });
  }


  loginSocial(accessToken: any): Observable<Response> {
          const body = {
      token: accessToken
    };
    return this.http.post('/api/auth/facebook', body).do((resp: Response) => {
      localStorage.setItem('jwt', resp.json().token);
      this.authEvents.next(new DidLogin());
    });
  }



  logout(): void {
    localStorage.removeItem('fb')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('jwt');
    this.authEvents.next(new DidLogout());
  }

  isSignedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }

  isMyself(user: User): boolean|null {
    if (!this.isSignedIn()) return null; // It means unknown.
    const decoded = jwtDecode(localStorage.getItem('jwt'));
    return user.id + '' === decoded.sub;
  }

  isSignedInFB(): boolean {
    return localStorage.getItem('fb') !== null;
  }

  signInFacebook(accessToken: string): void {
   // alert('accessToken');
    localStorage.setItem('fb', accessToken);
  }

  get events(): Observable<AuthEvent> {
    return this.authEvents;
  }

}

export class DidLogin {
}
export class DidLogout {
}

export type AuthEvent = DidLogin | DidLogout;

