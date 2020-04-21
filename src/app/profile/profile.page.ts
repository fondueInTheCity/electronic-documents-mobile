import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {FormBuilder} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {loadingController} from '@ionic/core';
import {UserService} from '../services/user.service';

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
                private alertController: AlertController) {
    }

    async ngOnInit() {
        this.username = this.tokenService.getUsername();
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.getSubscription = this.userService.getDashboard(this.username)
            .subscribe((data) => {
                    loading.dismiss();
                    this.profileForm.reset(data);
                },
                async error => {
                    await loading.dismiss();

                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: `${error.error.message}`,
                        buttons: ['OK']
                    });
                    await alert.present();
                }
            );
    }

    async onSubmit() {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.updateSubscription = this.userService.updateDashboard(this.username, this.profileForm.value)
            .subscribe((data) => {
                    loading.dismiss();
                    this.updateState();
                },
                async error => {
                    await loading.dismiss();
                    this.updateState();

                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: `${error.error.message}`,
                        buttons: ['OK']
                    });
                    await alert.present();
                }
            );
    }

    updateState() {
        this.readOnly = !this.readOnly;
    }

    ngOnDestroy(): void {
        this.getSubscription.unsubscribe();
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
    }
}
