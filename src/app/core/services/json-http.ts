import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {
  Http,
  RequestOptionsArgs,
  RequestOptions,
  Response,
  Headers
} from "@angular/http";

const mergeAuthToken = (options: RequestOptionsArgs = {}) => {
  let newOptions = new RequestOptions({}).merge(options);
  let newHeaders = new Headers(newOptions.headers);
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    newHeaders.set('authorization', `Bearer ${jwt}`);
  }
  newOptions.headers = newHeaders;
  return newOptions;
};

// TODO remove after fixing http-proxy in server.js
const host = "https://party-server-app.herokuapp.com";

@Injectable()
export class JsonHttp {

  constructor(private http: Http) {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(host + url, mergeAuthToken(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(host + url, body, mergeAuthToken(options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(host + url, body, mergeAuthToken(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(host + url, mergeAuthToken(options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(host + url, body, mergeAuthToken(options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.head(host + url, mergeAuthToken(options));
  }

}
