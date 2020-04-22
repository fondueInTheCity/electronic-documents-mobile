import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationInfo} from '../../models/organization/organization-info';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {AlertController} from '@ionic/angular';
import {OrganizationService} from '../../services/organization.service';
import {PropertiesService} from '../../services/properties.service';

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
                private alertController: AlertController,
                private properties: PropertiesService) {
    }

    async ngOnInit() {
        this.userId = this.tokenStorageService.getId();
        this.getOrganizations();
    }

    async getOrganizations() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.organizationService.getPublicOrganizations()
            .subscribe(async (organizationsInfo) => {
                    await this.properties.endLoading();
                    this.organizationsInfo = organizationsInfo;
                },
                async error => {
                    await this.properties.endLoading();
                    this.properties.getErrorAlertOpts(error);
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
        this.properties.unsubscribe(this.getSubscription);
    }
}
