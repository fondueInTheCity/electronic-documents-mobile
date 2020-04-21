import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';
import {loadingController} from '@ionic/core';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy {
    loginSubscription: Subscription;
    loginFailed = false;

    constructor(private authService: AuthService,
                private router: Router,
                private tokenStorage: TokenStorageService,
                private alertController: AlertController) {
    }

    async login(form) {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.loginSubscription = this.authService.attemptAuth(form.value).subscribe(
            data => {
                loading.dismiss();
                this.tokenStorage.saveData(data.token, data.username, data.id);
                this.router.navigate(['/dashboard']);
            },
            async error => {
                await loading.dismiss();

                const alert = await this.alertController.create({
                    header: 'Error',
                    message: `${error.error.message}`,
                    buttons: ['OK']
                });
                await alert.present();

                this.loginFailed = true;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }
}
