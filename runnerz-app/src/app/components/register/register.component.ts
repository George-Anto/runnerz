import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { ToastrService } from 'ngx-toastr';

import { User } from '../../models/auth/user.model';
import { UserService } from '../../services/user.service';
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
export class RegisterComponent implements OnDestroy {
  protected registerForm: FormGroup;
  protected loading = false;

  private serverAlertTimer: any = null;

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

  ngOnDestroy(): void {
    clearTimeout(this.serverAlertTimer);
  }

  protected onSubmit() {
    console.log(this.registerForm.value);

    if (!this.userService.validateUserForm(this.registerForm)) return;

    this.loading = true;
    const password = this.registerForm.value?.password;
    this.showSleepingServerAlert();

    this.userService.register(this.registerForm.value).subscribe({
      next: (user: User) => {
        clearTimeout(this.serverAlertTimer);
        this.authenticateRegisteredUser(user.username, password);
      },
      error: (error) => {
        clearTimeout(this.serverAlertTimer);
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

  private showSleepingServerAlert() {
    //Only check for slow response if the alert hasn't been shown
    if (!sessionStorage.getItem('serverAlertShown')) {
      this.serverAlertTimer = setTimeout(() => {
        //Show alert after 10 seconds of waiting
        alert(
          `Our server is currently sleeping after inactivity. The first actions may take a while to respond. Thank you for your patience!`
        );
        //Set the flag in sessionStorage to avoid showing it again in this session
        sessionStorage.setItem('serverAlertShown', 'true');
      }, 10000); //10 seconds
    }
  }
}
