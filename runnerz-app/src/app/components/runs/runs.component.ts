import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ToastrService } from 'ngx-toastr';

import { Run } from '../../models/run.model';
import { RunService } from '../../services/run.service';

@Component({
  selector: 'app-runs',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './runs.component.html',
  styleUrl: './runs.component.scss',
})
export class RunsComponent implements OnInit {
  protected runs: Run[] = [];
  protected loading = false;

  constructor(private runService: RunService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadRuns();
  }

  private loadRuns(): void {
    this.loading = true;
    this.runService.getRuns().subscribe({
      next: (data: Run[]) => {
        this.runs = data;
        console.log(this.runs);
      },
      error: (error) => {
        this.loading = false;
        console.error('Could not load Runs', error);
        this.toastr.error('Could not load Runs.', 'Error');
      },
      complete: () => {
        this.loading = false;
        console.log('Runs loading completed');
        this.toastr.success('Runs loading completed.', 'Success');
      },
    });
  }
}
