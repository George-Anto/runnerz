import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

import { Run } from '../../models/run.model';
import { RunService } from '../../services/run.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditRunDialogComponent } from '../edit-run-dialog/edit-run-dialog.component';

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
    MatDialogModule,
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
    private formBuilder: FormBuilder,
    private dialog: MatDialog
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
    console.log(this.createRunForm.value);

    if (!this.runService.validateForm(this.createRunForm)) return;

    this.createRunLoading = true;

    const newRun = {
      ...this.createRunForm.value,
      startedOn: this.adjustToLocalTimezone(
        new Date(this.createRunForm.value.startedOn)
      ).toISOString(),
      completedOn: this.adjustToLocalTimezone(
        new Date(this.createRunForm.value.completedOn)
      ).toISOString(),
    };

    this.runService.createRun(newRun).subscribe({
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

  protected editRun(run: Run) {
    const dialogRef = this.dialog.open(EditRunDialogComponent, {
      width: '400px',
      data: { run },
    });

    dialogRef.afterClosed().subscribe((updatedRun: Run) => {
      if (updatedRun) {
        this.runService.updateRun(updatedRun).subscribe({
          next: () => {
            this.toastr.success('Run updated successfully.', 'Success');
            this.loadRuns();
          },
          error: (error) => {
            this.toastr.error(
              `Failed to update run. ${error?.error?.message}`,
              'Error'
            );
            console.log('Error updating run.', error);
          },
        });
      }
    });
  }

  protected deleteRun(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.runService.deleteRun(id).subscribe({
          next: () => {
            this.toastr.success('Run deleted successfully.', 'Success');
            this.loadRuns();
          },
          error: (error) => {
            this.toastr.error(
              `Error deleting run. ${error?.error?.message}`,
              'Error'
            );
            console.log('Error deleting run.', error);
          },
        });
      }
    });
  }

  private adjustToLocalTimezone(date: Date): Date {
    const timezoneOffset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - timezoneOffset * 60000);

    return localDate;
  }
}
