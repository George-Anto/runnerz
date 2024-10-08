import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

import { Run } from '../../models/run.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RunService } from '../../services/run.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-run-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './edit-run-dialog.component.html',
  styleUrl: './edit-run-dialog.component.scss',
})
export class EditRunDialogComponent {
  protected editRunForm: FormGroup;
  protected maxDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private runService: RunService,
    private dialogRef: MatDialogRef<EditRunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { run: Run }
  ) {
    this.editRunForm = this.fb.group({
      title: [data.run.title, Validators.required],
      miles: [data.run.miles, [Validators.required, Validators.min(0.1)]],
      location: [data.run.location, Validators.required],
      startedOn: [data.run.startedOn, Validators.required],
      completedOn: [data.run.completedOn, Validators.required],
    });
  }

  protected onSubmit() {
    console.log(this.editRunForm.value);

    if (!this.runService.validateForm(this.editRunForm)) return;

    this.dialogRef.close({
      ...this.data.run,
      ...this.editRunForm.value,
    });
  }

  protected onCancel() {
    this.dialogRef.close();
  }
}
