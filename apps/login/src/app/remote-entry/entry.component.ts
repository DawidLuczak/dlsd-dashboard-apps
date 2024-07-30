import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../account/login/login.component';

@Component({
  standalone: true,
  imports: [CommonModule, LoginComponent],
  selector: 'dlsd-login-entry',
  template: `<dlsd-login></dlsd-login>`,
})
export class RemoteEntryComponent {}
