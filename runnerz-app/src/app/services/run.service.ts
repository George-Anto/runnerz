import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Run } from '../models/run.model';

@Injectable({
  providedIn: 'root',
})
export class RunService {
  private baseUrl = `${environment.SERVER_URL}/runnerz/api/run`;

  constructor(private http: HttpClient) {}

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

  public updateRun(id: number, run: Run): Observable<Run> {
    return this.http.put<Run>(`${this.baseUrl}/${id}`, run).pipe(
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
}
