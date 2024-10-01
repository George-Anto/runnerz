import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  protected onSubmit() {
    console.log(this.loginForm.value);
    this.toastr.error('Login not implemented yet.', 'Error');
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
}
