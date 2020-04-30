import {Component, OnInit} from '@angular/core';
import { File, Entry } from '@ionic-native/file/ngx';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, Platform, ToastController} from '@ionic/angular';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {DbService} from '../services/db.service';

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
    data: any;


    constructor(private tokenStorageService: TokenStorageService,
                private router: Router,
                private db: DbService,
                private properties: PropertiesServices) {
    }

    ngOnInit() {
        this.currentUsername = this.tokenStorageService.getUsername();
        this.db.dbState().subscribe((res) => {
            if (res) {
                this.db.fetchSongs().subscribe(item => {
                    this.data = item;
                });
            }
        });
    }

    logout() {
        this.tokenStorageService.clearData();
        this.router.navigate(['auth/login']);
    }
}
