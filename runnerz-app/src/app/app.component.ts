import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'runnerz-app';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(`${environment.SERVER_URL}/runnerz/api/runs`)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
