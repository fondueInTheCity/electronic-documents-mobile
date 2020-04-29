import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../services/organization.service';
import {FormBuilder} from '@angular/forms';
import {PropertiesService} from '../../services/properties.service';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {OrganizationOffer} from '../../models/organization/organization-offer';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-join-to-organization',
    templateUrl: './join-to-organization.page.html',
    styleUrls: ['./join-to-organization.page.scss'],
})
export class JoinToOrganizationPage implements OnInit, OnDestroy {
    getSubscription: Subscription;
    answerSubscription: Subscription;
    userRequests: OrganizationOffer[];
    organizationRequests: OrganizationOffer[];

    constructor(private service: UserService,
                private fb: FormBuilder,
                private properties: PropertiesService,
                private tokenStorageService: TokenStorageService,
                private alertController: AlertController,
                private organizationService: OrganizationService) {
    }

    async ngOnInit() {
        await this.getRequests();
    }

    async doRefresh(event) {
        this.getRequests(event);
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

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
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
        this.getSubscription = this.service.getOrganizationsOffers(this.tokenStorageService.getUsername())
            .subscribe(async (data) => {
                    this.userRequests = data.userRequests;
                    this.organizationRequests = data.organizationRequests;
                    await this.properties.endLoading();
                    if (event) {
                        event.target.complete();
                    }
                }, async () => {
                    await this.properties.endLoading();
                    if (event) {
                        event.target.complete();
                    }
                }
            );
    }
}
