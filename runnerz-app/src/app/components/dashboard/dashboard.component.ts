import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  protected currentYear = new Date().getFullYear();
  protected username: string | undefined;
  protected isAdmin = false;

  constructor(private authService: AuthService) {
    this.username = this.authService.getCurrentUser()?.username;
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.hasAdminRole();
  }

  protected logout(): void {
    this.authService.logout();
  }
}
