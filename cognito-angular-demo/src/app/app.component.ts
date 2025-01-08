import { Component, OnInit, inject  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProtectedComponent } from './protected.component';

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
  isAuthenticated = false;

  ngOnInit(): void {
    // This stream emits whenever the authentication state changes
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      console.log('Is Authenticated:', isAuthenticated);
    });

    // This stream emits the decoded ID token claims (if any)
    this.userData$ = this.oidcSecurityService.userData$;
  }

  login(): void {
    // Kick off the OIDC flow
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    // Logs out on Cognito and redirects back to postLogoutRedirectUri
    this.oidcSecurityService.logoff();
  }
}
