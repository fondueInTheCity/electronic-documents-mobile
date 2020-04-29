import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../../services/organization.service';
import {ModalController} from '@ionic/angular';
import {mergeMap, tap} from 'rxjs/operators';
import {OrganizationMember} from '../../../../../models/organization/organization-member';
import {PropertiesService} from '../../../../../services/properties.service';
import {OrganizationRoleInfo} from '../../../../../models/organization/organization-role-info';
import {Subscription} from 'rxjs';
import {FormBuilder} from '@angular/forms';

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
    addRolesForm = this.fb.group({
        role: []
    });


    constructor(private organizationService: OrganizationService,
                private modalController: ModalController,
                private properties: PropertiesService,
                private fb: FormBuilder) {
    }

    async ngOnInit() {
        this.getData();
    }

    async getData(event = null) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.organizationService.getOrganizationMember(this.organizationId, this.memberId).pipe(
            tap((data) => this.organizationMember = data),
            mergeMap(() => this.organizationService.getOrganizationRoles(this.organizationId))
        ).subscribe(async (roles) => {
            await this.properties.endLoading();
            this.allRoles = roles;
            if (event) {
                event.target.complete();
            }
        }, async error => {
            await this.properties.endLoading();
            if (event) {
                event.target.complete();
            }
        });
    }

    back() {
        this.modalController.dismiss();
    }

    async doRefresh(event) {
        this.getData(event);
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
    }

    onSubmit() {
        this.organizationService.addRole(this.organizationId, this.memberId, this.addRolesForm.value).subscribe(() =>
            this.getData()
        );
    }

    removeRole(roleId: number) {
        this.organizationService.deleteRole(this.organizationId, this.memberId, roleId).subscribe(() =>
            this.getData()
        );
    }
}
