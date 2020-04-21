import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';
import {AlertController} from '@ionic/angular';
import {loadingController} from '@ionic/core';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    constructor(private authService: AuthService,
                private router: Router,
                private alertController: AlertController) {
    }

    async register(form) {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.authService.signUp(form.value).subscribe((res) => {
                loading.dismiss();
                this.router.navigateByUrl('/auth/login');
            },
            async error => {
                await loading.dismiss();

                const alert = await this.alertController.create({
                    header: 'Error',
                    message: `${error.error.message}`,
                    buttons: ['OK']
                });
                await alert.present();
            });
    }

}
