import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrganizationMember} from '../../../../models/organization/organization-member';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../../services/organization.service';
import {PropertiesService} from '../../../../services/properties.service';
import {AlertController, ModalController} from '@ionic/angular';
import {MemberViewPage} from './member-view/member-view.page';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';

@Component({
    selector: 'app-organization-view-members',
    templateUrl: './organization-view-members.page.html',
    styleUrls: ['./organization-view-members.page.scss'],
})
export class OrganizationViewMembersPage implements OnInit, OnDestroy {
    getSubscription: Subscription;
    members: OrganizationMember[];

    constructor(private activatedRoute: ActivatedRoute,
                private organizationService: OrganizationService,
                private properties: PropertiesService,
                private alertController: AlertController,
                private modalController: ModalController,
                private tokenStorageService: TokenStorageService) {
    }

    async ngOnInit() {
        this.getMembers();
    }

    async getMembers(event = null) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.organizationService.getMembers(this.properties.getCurrentOrganizationId())
            .subscribe(async (data: OrganizationMember[]) => {
                    await this.properties.endLoading();
                    this.members = data;
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

    async presentRolesModal(userId: number) {
        const modal = await this.modalController.create({
            component: MemberViewPage,
            componentProps: {
                organizationId: this.properties.getCurrentOrganizationId(),
                memberId: userId
            }
        });
        return await modal.present();
    }

    async doRefresh(event) {
        this.getMembers(event);
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
    }

    admin(): boolean {
        return this.tokenStorageService.hasPermissions(this.properties.getCurrentOrganizationId());
    }
}
