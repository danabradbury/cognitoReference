import { Component, OnInit, inject  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProtectedComponent } from './protected.component';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProtectedComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'cognito-angular-demo';

  // Inject the OIDC service
  private readonly oidcSecurityService = inject(OidcSecurityService);

  // Observables exposed by the library
  userData$!: Observable<any>;
  accessToken$!: Observable<any>;
  idToken$!: Observable<any>;
  isAuthenticated = false;

  ngOnInit(): void {
    // This stream emits whenever the authentication state changes
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      console.log('Is Authenticated:', isAuthenticated);
    });

    // This stream emits the decoded ID token claims (if any)
    this.userData$ = this.oidcSecurityService.userData$;
    
    // used just show the user the tokens for demo purposes
    this.accessToken$ = this.oidcSecurityService.getAccessToken();
    this.idToken$ = this.oidcSecurityService.getIdToken();
  }

  login(): void {
    // Kick off the OIDC flow
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    // Clear session storage
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
  
    window.location.href = "https://us-east-1xvvgolh0y.auth.us-east-1.amazoncognito.com/logout?client_id=61food7rnfk6501lg535p182it&logout_uri=http://localhost:4200"; 

  }

  getDecodedAccessToken(token: string): String {
      try {

        return JSON.stringify(jwtDecode(token), null, 4);
      } catch(Error) {
        return "null";
      }
    }
}
