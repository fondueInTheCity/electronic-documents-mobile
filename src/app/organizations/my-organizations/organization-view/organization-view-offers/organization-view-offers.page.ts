import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {Subscription} from 'rxjs';
import {PropertiesService} from '../../../../services/properties.service';
import {AlertController, ModalController} from '@ionic/angular';
import {OrganizationOffer} from '../../../../models/organization/organization-offer';
import {GenerateOrganizationJoinJwt} from '../../../../models/generate-organization-join-jwt';
import {OrganizationRolesModalPage} from '../organization-view-settings/organization-roles-modal/organization-roles-modal.page';
import {CreateOrganizationRequestPage} from './create-organization-request/create-organization-request.page';

@Component({
    selector: 'app-organization-view-offers',
    templateUrl: './organization-view-offers.page.html',
    styleUrls: ['./organization-view-offers.page.scss'],
})
export class OrganizationViewOffersPage implements OnInit, OnDestroy {
    getSubscription: Subscription;
    answerSubscription: Subscription;
    organizationId: number;
    userRequests: OrganizationOffer[];
    organizationRequests: OrganizationOffer[];

    constructor(private organizationService: OrganizationService,
                private properties: PropertiesService,
                private alertController: AlertController,
                private modalController: ModalController) {
    }

    async ngOnInit() {
        this.organizationId = this.properties.getCurrentOrganizationId();
        this.getRequests();
    }

    async openOffer(item: OrganizationOffer) {
        const alert = await this.alertController.create({
            header: 'Do you want to approve this request?',
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
        await this.properties.startLoading();
        this.properties.unsubscribe(this.answerSubscription);
        this.answerSubscription = this.organizationService.answerOffer({offerId, answer})
            .subscribe(async () => {
                await this.properties.endLoading();
                this.getRequests();
            }, async error => {
                await this.properties.endLoading();
            }
        );
    }

    async getRequests(event = null) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.organizationService.getOrganizationOffers(this.organizationId)
            .subscribe(async (data) => {
                    await this.properties.endLoading();
                    this.userRequests = data.userRequests;
                    this.organizationRequests = data.organizationRequests;
                    if (event) {
                        event.target.complete();
                    }
                },
                async error => {
                    await this.properties.endLoading();
                    this.properties.getErrorAlertOpts(error);
                    if (event) {
                        event.target.complete();
                    }
                });
    }

    async presentRolesModal() {
        const modal = await this.modalController.create({
            component: CreateOrganizationRequestPage,
            componentProps: {
                organizationId: this.organizationId
            }
        });
        return await modal.present();
    }

    async doRefresh(event) {
        this.getRequests(event);
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
        this.properties.unsubscribe(this.answerSubscription);
    }
}
