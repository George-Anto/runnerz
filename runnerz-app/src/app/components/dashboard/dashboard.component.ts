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
  constructor(private authService: AuthService) {}

  protected currentYear = new Date().getFullYear();
  protected isAdmin = false;
  ngOnInit(): void {
    this.isAdmin = this.authService.hasAdminRole();
  }

  protected logout(): void {
    this.authService.logout();
  }
}
