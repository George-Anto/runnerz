import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  onGoogleLogin() {
    console.log('GoogleLogin!');
  }

  onFacebookLogin() {
    console.log('Facebook Login!');
  }

  onForgotPassword() {
    console.log('Forgot Password!');
    // this.router.navigate(['/forgot-password']);
  }

  onRegister() {
    console.log('Register!');
    // this.router.navigate(['/register']);
  }
}
