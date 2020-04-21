import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrganizationInfo} from '../../models/organization/organization-info';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {loadingController} from '@ionic/core';
import {FormBuilder} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.page.html',
  styleUrls: ['./my-organizations.page.scss'],
})
export class MyOrganizationsPage implements OnInit, OnDestroy {
    organizationsInfo = Array<OrganizationInfo>();
    getSubscription: Subscription;

    constructor(private userService: UserService,
                private tokenStorageService: TokenStorageService,
                private alertController: AlertController) {
    }

    async ngOnInit() {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.getSubscription = this.userService.getOrganizationsInfo(this.tokenStorageService.getUsername())
            .subscribe(organizationsInfo => {
                loading.dismiss();
                this.organizationsInfo = organizationsInfo;
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
        this.getSubscription.unsubscribe();
    }
}
