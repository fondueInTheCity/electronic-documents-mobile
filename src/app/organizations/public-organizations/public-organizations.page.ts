import {Component, OnDestroy, OnInit} from '@angular/core';
import {loadingController} from '@ionic/core';
import {OrganizationInfo} from '../../models/organization/organization-info';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {AlertController} from '@ionic/angular';
import {OrganizationService} from '../../services/organization.service';
import {DocumentInfo} from '../../models/documents/document-info';

@Component({
    selector: 'app-public-organizations',
    templateUrl: './public-organizations.page.html',
    styleUrls: ['./public-organizations.page.scss'],
})
export class PublicOrganizationsPage implements OnInit, OnDestroy {
    organizationsInfo = Array<OrganizationInfo>();
    getSubscription: Subscription;
    userId: number;

    constructor(private organizationService: OrganizationService,
                private tokenStorageService: TokenStorageService,
                private alertController: AlertController) {
    }

    async ngOnInit() {
        this.userId = this.tokenStorageService.getId();
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.getSubscription = this.organizationService.getPublicOrganizations()
            .subscribe((organizationsInfo) => {
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

    async approveDenyJoinAlert(organizationId: number) {
        const alert = await this.alertController.create({
            header: 'Error',
            message: `Approve document?`,
            buttons: [
                {
                    text: 'Approve',
                    handler: () => this.organizationService.createRequest(organizationId, this.userId).subscribe()
                },
                {
                    text: 'Deny'
                }]
        });
        await alert.present();
    }

    ngOnDestroy(): void {
        this.getSubscription.unsubscribe();
    }
}
