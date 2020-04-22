import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../../services/organization.service';
import {ModalController} from '@ionic/angular';
import {mergeMap, tap} from 'rxjs/operators';
import {OrganizationMember} from '../../../../../models/organization/organization-member';
import {PropertiesService} from '../../../../../services/properties.service';
import {OrganizationRoleInfo} from '../../../../../models/organization/organization-role-info';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-member-view',
    templateUrl: './member-view.page.html',
    styleUrls: ['./member-view.page.scss'],
})
export class MemberViewPage implements OnInit, OnDestroy {
    @Input() memberId: number;
    @Input() organizationId: number;
    organizationMember: OrganizationMember;
    allRoles: OrganizationRoleInfo[];
    getSubscription: Subscription;


    constructor(private organizationService: OrganizationService,
                private modalController: ModalController,
                private properties: PropertiesService) {
    }

    async ngOnInit() {
        this.getData();
    }

    async getData() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.organizationService.getOrganizationMember(this.organizationId, this.memberId).pipe(
            tap((data) => this.organizationMember = data),
            mergeMap(() => this.organizationService.getOrganizationRoles(this.organizationId))
        ).subscribe(async (roles) => {
            await this.properties.endLoading();
            this.allRoles = roles;
        }, async error => {
            await this.properties.endLoading();
        });
    }

    back() {
        this.modalController.dismiss();
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
    }
}
