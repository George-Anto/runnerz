import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RunService } from './services/run.service';
import { Run } from './models/run.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'runnerz-app';
  runs: Run[] = [];

  constructor(private runService: RunService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadRuns();
  }

  private loadRuns(): void {
    this.runService.getRuns().subscribe({
      next: (data: Run[]) => {
        this.runs = data;
        console.log(this.runs);
      },
      error: (error) => {
        console.error('Could not load Runs', error);
        this.toastr.error('Could not load Runs.', 'Error');
      },
      complete: () => {
        console.log('Runs loading completed');
        this.toastr.success('Runs loading completed.', 'Success');
      },
    });
  }
}
