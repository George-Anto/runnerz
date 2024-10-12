import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected loginForm: FormGroup;
  protected loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras?.state) {
      this.toastr.error(navigation.extras.state['message'], 'Error');
    }
  }

  protected onSubmit() {
    console.log(this.loginForm.value);

    if (!this.validateForm()) return;

    this.loading = true;

    this.authService.authenticate(this.loginForm.value).subscribe({
      next: (data: User) => {
        this.authService.saveUser(data.jwt);
      },
      error: (err) => {
        console.error('Authentication failed:', err);
        this.loading = false;
        this.toastr.error(
          `Authentication failed.<br />${
            err?.error?.message || 'You can try:'
          }<br />Credentials: admin / admin`,
          'Error',
          {
            enableHtml: true,
          }
        );
      },
      complete: () => {
        this.loading = false;
        this.authService.hasAdminRole()
          ? this.router.navigate(['/users'])
          : this.router.navigate(['/runs']);
      },
    });
  }

  protected onGoogleLogin() {
    this.toastr.error('Google Login not implemented yet.', 'Error');
  }

  protected onFacebookLogin() {
    this.toastr.error('Facebook Login not implemented yet.', 'Error');
  }

  protected onForgotPassword() {
    this.toastr.error('Forgot Password not implemented yet.', 'Error');
    // this.router.navigate(['/forgot-password']);
  }

  protected onRegister() {
    this.toastr.error('Sign Up not implemented yet.', 'Error');
    // this.router.navigate(['/register']);
  }

  private validateForm(): boolean {
    if (this.loginForm.invalid) {
      if (this.loginForm.get('username')?.errors?.['required']) {
        this.toastr.error('Please provide a username.', 'Error');
        return false;
      }

      const passwordControl = this.loginForm.get('password');
      if (passwordControl?.errors?.['required']) {
        this.toastr.error('Please provide a password.', 'Error');
        return false;
      }

      if (passwordControl?.errors?.['minlength']) {
        this.toastr.error(
          `Password must be at least ${passwordControl.errors['minlength'].requiredLength} characters long.`,
          'Error'
        );
        return false;
      }

      this.toastr.error('Form is invalid.', 'Error');
      return false;
    }

    return true;
  }
}
