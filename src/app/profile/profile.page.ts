import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {FormBuilder} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {UserService} from '../services/user.service';
import {PropertiesService} from '../services/properties.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
    updateSubscription: Subscription;
    getSubscription: Subscription;
    profileForm = this.fb.group({
        firstName: [],
        middleName: [],
        lastName: [],
        email: [],
        username: []
    });
    username: string;
    readOnly = true;

    constructor(private userService: UserService,
                private activatedRoute: ActivatedRoute,
                private tokenService: TokenStorageService,
                private router: Router,
                private fb: FormBuilder,
                private alertController: AlertController,
                private properties: PropertiesService) {
    }

    async ngOnInit() {
        this.username = this.tokenService.getUsername();
        this.getDashboard();
    }

    async getDashboard() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.userService.getDashboard(this.username)
            .subscribe(async (data) => {
                    await this.properties.endLoading();
                    this.profileForm.reset(data);
                },
                async error => {
                    await this.properties.endLoading();
                    this.properties.getErrorAlertOpts(error);
                }
            );
    }

    async onSubmit() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.updateSubscription);
        this.updateSubscription = this.userService.updateDashboard(this.username, this.profileForm.value)
            .subscribe(async (data) => {
                    await this.properties.endLoading();
                    this.updateState();
                },
                async error => {
                    await this.properties.endLoading();
                    this.updateState();
                    this.properties.getErrorAlertOpts(error);
                }
            );
    }

    updateState() {
        this.readOnly = !this.readOnly;
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.updateSubscription);
        this.properties.unsubscribe(this.getSubscription);
    }
}
