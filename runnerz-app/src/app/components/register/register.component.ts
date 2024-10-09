import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/auth/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected registerForm: FormGroup;
  protected loading = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      roles: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  protected onSubmit() {
    console.log(this.registerForm.value);

    if (!this.userService.validateUserForm(this.registerForm)) return;

    this.loading = true;
    const password = this.registerForm.value?.password;

    this.userService.register(this.registerForm.value).subscribe({
      next: (user: User) => {
        this.authenticateRegisteredUser(user.username, password);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error creating user', error);
        this.toastr.error(
          error?.error?.message || 'Error creating user.',
          'Error'
        );
      },
    });
  }

  protected onRoleChange(event: Event, role: string) {
    const target = event.target as HTMLInputElement;
    const roles = this.registerForm.get('roles')?.value || [];

    if (target.checked) {
      this.registerForm.patchValue({ roles: [...roles, role] });
    } else {
      this.registerForm.patchValue({
        roles: roles.filter((r: string) => r !== role),
      });
    }
  }

  private authenticateRegisteredUser(username: string, password: string) {
    this.authService.authenticate({ username, password }).subscribe({
      next: (data: User) => {
        this.authService.saveUser(data.jwt);
      },
      error: (err) => {
        console.error('Authentication failed:', err);
        this.loading = false;
        this.toastr.error(
          `Authentication of newly created User failed.<br />${
            err?.error?.message || ''
          }`,
          'Error'
        );
      },
      complete: () => {
        this.loading = false;
        this.router.navigate(['/runs']);
        this.toastr.success('User created successfully!', 'Success');
      },
    });
  }
}
