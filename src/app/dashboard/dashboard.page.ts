import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    currentUsername: string;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit() {
      this.currentUsername = this.tokenStorageService.getUsername();
  }

    logout() {
      this.tokenStorageService.clearData();
      this.router.navigate(['auth/login']);
    }
}
