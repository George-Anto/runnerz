import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToastrService } from 'ngx-toastr';

import { User } from '../../models/auth/user.model';
import { UserService } from '../../services/user.service';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  protected users: User[] = [];
  protected displayedColumns: string[] = ['username', 'roles'];
  protected createUserForm: FormGroup;
  protected usersLoading = false;
  protected createUserLoading = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.createUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      roles: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  protected loadUsers(reload = false) {
    this.usersLoading = true;
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        this.usersLoading = false;
        this.users = [];
        console.error('Could not load Users', error);
        this.toastr.error('Could not load Users.', 'Error');
      },
      complete: () => {
        this.usersLoading = false;
        console.log('Users loading completed');
        reload && this.toastr.success('Users loading completed.', 'Success');
      },
    });
  }

  protected onSubmit() {
    console.log(this.createUserForm.value);

    if (!this.userService.validateUserForm(this.createUserForm)) return;

    this.createUserLoading = true;

    this.userService.createUser(this.createUserForm.value).subscribe({
      next: (user: User) => {
        this.createUserLoading = false;
        this.toastr.success(
          `User ${user.username} created successfully.`,
          'Success'
        );
        this.loadUsers();
      },
      error: (error) => {
        this.createUserLoading = false;
        console.error('Error creating user', error);
        this.toastr.error(
          error?.error?.message || 'Error creating user.',
          'Error'
        );
      },
      complete: () => {
        this.createUserForm.get('username')?.reset();
        this.createUserForm.get('password')?.reset();
      },
    });
  }

  protected onRoleChange(event: Event, role: string) {
    const target = event.target as HTMLInputElement;
    const roles = this.createUserForm.get('roles')?.value || [];

    if (target.checked) {
      this.createUserForm.patchValue({ roles: [...roles, role] });
    } else {
      this.createUserForm.patchValue({
        roles: roles.filter((r: string) => r !== role),
      });
    }
  }
}
