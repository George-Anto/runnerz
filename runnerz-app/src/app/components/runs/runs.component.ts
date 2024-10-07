import { Component, OnInit } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ToastrService } from 'ngx-toastr';

import { Run } from '../../models/run.model';
import { RunService } from '../../services/run.service';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

@Component({
  selector: 'app-runs',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ],
  templateUrl: './runs.component.html',
  styleUrl: './runs.component.scss',
})
export class RunsComponent implements OnInit {
  protected runs: Run[] = [];
  protected displayedColumns: string[] = [
    'title',
    'miles',
    'location',
    'startedOn',
    'completedOn',
    'actions',
  ];
  protected createRunForm: FormGroup;
  protected runsLoading = false;
  protected createRunLoading = false;
  protected maxDate: Date = new Date();

  constructor(
    private runService: RunService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.createRunForm = this.formBuilder.group({
      title: ['', Validators.required],
      miles: ['', [Validators.required, Validators.min(0.1)]],
      location: ['', Validators.required],
      startedOn: ['', Validators.required],
      completedOn: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRuns();
  }

  protected loadRuns(reload = false): void {
    this.runsLoading = true;
    this.runService.getRuns().subscribe({
      next: (data: Run[]) => {
        this.runs = data;
        console.log(this.runs);
      },
      error: (error) => {
        this.runsLoading = false;
        console.error('Could not load Runs', error);
        this.toastr.error('Could not load Runs.', 'Error');
      },
      complete: () => {
        this.runsLoading = false;
        console.log('Runs loading completed');
        reload && this.toastr.success('Runs loading completed.', 'Success');
      },
    });
  }

  protected onSubmitRun() {
    console.log(this.createRunForm);

    if (!this.validateForm()) return;

    this.createRunLoading = true;

    this.runService.createRun(this.createRunForm.value).subscribe({
      next: (run: Run) => {
        this.createRunLoading = false;
        this.toastr.success(
          `Run ${run.title} created successfully.`,
          'Success'
        );
        this.loadRuns();
      },
      error: (error) => {
        this.createRunLoading = false;
        this.toastr.error(
          `Error creating run. ${error?.error?.message || ''}`,
          'Error'
        );
        console.log('Error creating run.', error);
      },
      complete: () => {
        this.createRunForm.reset();
      },
    });
  }

  protected deleteRun(id: number) {
    this.runService.deleteRun(id).subscribe({
      next: () => {
        this.toastr.success('Run deleted successfully.', 'Success');
        this.loadRuns();
      },
      error: (error) => {
        this.toastr.error('Error deleting run.', 'Error');
        console.log('Error deleting run.', error);
      },
    });
  }

  private validateForm(): boolean {
    const startedOnControl = this.createRunForm.get('startedOn');
    const completedOnControl = this.createRunForm.get('completedOn');

    if (this.createRunForm.invalid) {
      if (this.createRunForm.get('title')?.errors?.['required']) {
        this.toastr.error('Please provide a title.', 'Error');
        return false;
      }

      const milesControl = this.createRunForm.get('miles');
      if (milesControl?.errors?.['required']) {
        this.toastr.error('Please provide the miles.', 'Error');
        return false;
      }

      if (milesControl?.errors?.['min']) {
        this.toastr.error(
          `Miles must be at least ${milesControl?.errors?.['min'].min}.`,
          'Error'
        );
        return false;
      }

      if (this.createRunForm.get('location')?.errors?.['required']) {
        this.toastr.error('Please provide a location.', 'Error');
        return false;
      }

      if (startedOnControl?.errors?.['required']) {
        this.toastr.error('Please provide the start date and time.', 'Error');
        return false;
      }

      if (completedOnControl?.errors?.['required']) {
        this.toastr.error(
          'Please provide the completion date and time.',
          'Error'
        );
        return false;
      }

      this.toastr.error('Form is invalid.', 'Error');
      return false;
    }

    if (
      new Date(completedOnControl?.value) <= new Date(startedOnControl?.value)
    ) {
      this.toastr.error(
        'Completion date must be after the start date.',
        'Error'
      );
      return false;
    }

    return true;
  }
}
