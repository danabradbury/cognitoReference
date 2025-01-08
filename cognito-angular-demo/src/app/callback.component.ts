import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-callback',
    standalone: true, // Ensure this is a standalone component
    imports: [CommonModule, RouterModule], // Add necessary imports
    template: `<p>Callback in progress...</p>` // Add a simple template
  })
export class CallbackComponent implements OnInit {
    constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {}
    
    ngOnInit(): void {
        this.oidcSecurityService.checkAuth().subscribe({
            next: ({ isAuthenticated }) => {
              if (isAuthenticated) {
                this.router.navigate(['/']);
              } else {
                // handle the case when it's NOT an error but user is not authenticated
                console.log('Not authenticated, but no error from server');
                this.router.navigate(['/']);
              }
            },
            error: (err) => {
              console.error('checkAuth encountered an error:', err);
              // Example: Navigate to an error page or show a message
              this.router.navigate(['/'], { queryParams: { message: 'Auth failed' } });
            },
          });
    }
  }