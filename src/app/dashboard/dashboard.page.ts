import {Component, OnInit} from '@angular/core';
import {Entry} from '@ionic-native/file/ngx';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {Router} from '@angular/router';
import {DbService} from '../services/db.service';
import {PropertiesService} from '../services/properties.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    currentUsername: string;
    directories = [];
    folder = '';
    copyFile: Entry = null;
    shouldMove = false;


    constructor(private tokenStorageService: TokenStorageService,
                private router: Router,
                private properties: PropertiesService) {
    }

    ngOnInit() {
        this.currentUsername = this.tokenStorageService.getUsername();
    }

    logout() {
        this.tokenStorageService.clearData();
        this.router.navigate(['auth/login']);
    }
}
