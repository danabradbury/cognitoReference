
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SecureApiService {
  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService
  ) {}

  callSecuredEndpoint(): Observable<any> {
    // 1) Get the currently stored access token as an observable
    return this.oidcSecurityService.getAccessToken().pipe(
      switchMap(token => {
        console.log('Access token:', token);
        console.log(JSON.stringify(token));

        // 2) Build the headers with the Bearer token
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );

        // 3) Call your secured endpoint and return the observable
        return this.http.get('http://localhost:8080/api/hello', { headers });
      })
    );
  }
}