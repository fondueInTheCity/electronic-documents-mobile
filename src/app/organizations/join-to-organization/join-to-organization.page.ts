import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../services/organization.service';
import {FormBuilder} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {loadingController} from '@ionic/core';
import {TokenStorageService} from '../../auth/services/token-storage.service';

@Component({
  selector: 'app-join-to-organization',
  templateUrl: './join-to-organization.page.html',
  styleUrls: ['./join-to-organization.page.scss'],
})
export class JoinToOrganizationPage implements OnDestroy {
    joinSubscription: Subscription;
    joinForm = this.fb.group({
        token: []
    });

    constructor(private service: OrganizationService,
                private fb: FormBuilder,
                private alertController: AlertController,
                private tokenStorageService: TokenStorageService) {
    }

    async onSubmit() {
        const userId = this.tokenStorageService.getId();
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.joinSubscription = this.service.privateJoin(this.joinForm.value)
            .subscribe(() => {
                    loading.dismiss();
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

    ngOnDestroy(): void {
        if (this.joinSubscription) {
            this.joinSubscription.unsubscribe();
        }
    }
}
