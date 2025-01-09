import { Component } from '@angular/core';
import { SecureApiService } from './service/secure.api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-protected',
  imports: [ CommonModule ],
  template: `
    <button (click)="callBackend()">Call Secured Endpoint</button>
    <p *ngIf="response">{{ response | json }}</p>
  `,
})
export class ProtectedComponent {
  response?: string;

  constructor(private secureApiService: SecureApiService) {}

  callBackend() {
    this.secureApiService.callSecuredEndpoint().subscribe({
      next: (data) => {
        this.response = data;
        console.log('Secured endpoint response:', data);
      },
      error: (err) => {
        console.error('Secured endpoint error:', err);
        this.response = `Error: ${err.message}`;
      },
    });
  }
}