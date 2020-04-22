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
export class OrganizationViewOffersPage implements OnInit, OnDestroy {
    getSubscription: Subscription;
    answerSubscription: Subscription;
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
        await this.properties.startLoading();
        this.properties.unsubscribe(this.answerSubscription);
        this.answerSubscription = this.organizationService.answerOffer(this.organizationId, {offerId, answer})
            .subscribe(async () => {
                await this.properties.endLoading();
                this.getRequests();
            }, async error => {
                await this.properties.endLoading();
            }
        );
    }

    async getRequests() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.organizationService.getOrganizationOffers(this.organizationId)
            .subscribe(async (data) => {
                    await this.properties.endLoading();
                    this.requests = data;
                },
                async error => {
                    await this.properties.endLoading();
                    this.properties.getErrorAlertOpts(error);
                });
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
        this.properties.unsubscribe(this.answerSubscription);
    }
}
