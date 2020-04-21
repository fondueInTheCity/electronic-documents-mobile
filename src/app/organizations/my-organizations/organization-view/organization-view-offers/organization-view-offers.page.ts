import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {Subscription} from 'rxjs';
import {PropertiesService} from '../../../../services/properties.service';
import {loadingController} from '@ionic/core';
import {AlertController} from '@ionic/angular';
import {OrganizationOffer} from '../../../../models/organization/organization-offer';

@Component({
    selector: 'app-organization-view-offers',
    templateUrl: './organization-view-offers.page.html',
    styleUrls: ['./organization-view-offers.page.scss'],
})
export class OrganizationViewOffersPage implements OnInit {
    getSubscription: Subscription;
    organizationId: number;
    requests: OrganizationOffer[];

    constructor(private organizationService: OrganizationService,
                private properties: PropertiesService,
                private alertController: AlertController) {
    }

    async ngOnInit() {
        this.organizationId = this.properties.getCurrentOrganizationId();
        this.getRequests();
    }

    async openOffer(item: OrganizationOffer) {
        const alert = await this.alertController.create({
            header: 'Error',
            message: `${item.ownerUsername}`,
            buttons: [
                {
                    text: 'Approve',
                    handler: () => this.sendAnswer(true, item.id)
                },
                {
                    text: 'Deny',
                    handler: () => this.sendAnswer(false, item.id)
                }]
        });
        await alert.present();
    }

    async sendAnswer(answer: boolean, offerId: number) {
        this.organizationId = this.properties.getCurrentOrganizationId();
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.organizationService.answerOffer(this.organizationId, {offerId, answer}).subscribe(() => {
                loading.dismiss();
                this.getRequests();
            }, error => {
                loading.dismiss();
            }
        );
    }

    async getRequests() {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.organizationService.getOrganizationOffers(this.organizationId)
            .subscribe((data) => {
                    loading.dismiss();
                    this.requests = data;
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
