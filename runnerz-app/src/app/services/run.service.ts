import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Run } from '../models/run.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RunService {
  private baseUrl = `${environment.SERVER_URL}/runnerz/api/run`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  public getRuns(): Observable<Run[]> {
    return this.http.get<Run[]>(this.baseUrl).pipe(
      map((runs: Run[]) =>
        runs.map((run: Run) => ({
          ...run,
          startedOn: new Date(run.startedOn),
          completedOn: new Date(run.completedOn),
        }))
      )
    );
  }

  public getRunById(id: number): Observable<Run> {
    return this.http.get<Run>(`${this.baseUrl}/${id}`).pipe(
      map((run: Run) => ({
        ...run,
        startedOn: new Date(run.startedOn),
        completedOn: new Date(run.completedOn),
      }))
    );
  }

  public createRun(run: Run): Observable<Run> {
    return this.http.post<Run>(this.baseUrl, run).pipe(
      map((run: Run) => ({
        ...run,
        startedOn: new Date(run.startedOn),
        completedOn: new Date(run.completedOn),
      }))
    );
  }

  public updateRun(run: Run): Observable<Run> {
    return this.http.put<Run>(`${this.baseUrl}/${run.id}`, run).pipe(
      map((run: Run) => ({
        ...run,
        startedOn: new Date(run.startedOn),
        completedOn: new Date(run.completedOn),
      }))
    );
  }

  public deleteRun(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  public validateForm(runForm: FormGroup): boolean {
    const startedOnControl = runForm.get('startedOn');
    const completedOnControl = runForm.get('completedOn');

    if (runForm.invalid) {
      if (runForm.get('title')?.errors?.['required']) {
        this.toastr.error('Please provide a title.', 'Error');
        return false;
      }

      const milesControl = runForm.get('miles');
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

      if (runForm.get('location')?.errors?.['required']) {
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

      const startedOnDate = new Date(startedOnControl?.value);
      const completetOnDate = new Date(completedOnControl?.value);

      if (startedOnDate >= new Date()) {
        this.toastr.error(
          `Start on time must be before ${new Date().getHours()}:${new Date().getMinutes()}.`,
          'Error'
        );
        return false;
      }

      if (completetOnDate >= new Date()) {
        this.toastr.error(
          `Completed on time must be before ${new Date().getHours()}:${new Date().getMinutes()}.`,
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
