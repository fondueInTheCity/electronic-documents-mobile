import {Component, Input, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../../services/organization.service';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {UserService} from '../../../../../services/user.service';
import {TokenStorageService} from '../../../../../auth/services/token-storage.service';
import {mergeMap, tap} from 'rxjs/operators';
import {OrganizationMember} from '../../../../../models/organization/organization-member';
import {PropertiesService} from '../../../../../services/properties.service';
import {OrganizationInfo} from '../../../../../models/organization/organization-info';
import {OrganizationRoleInfo} from '../../../../../models/organization/organization-role-info';
import {loadingController} from '@ionic/core';

@Component({
    selector: 'app-member-view',
    templateUrl: './member-view.page.html',
    styleUrls: ['./member-view.page.scss'],
})
export class MemberViewPage implements OnInit {
    @Input() memberId: number;
    @Input() organizationId: number;
    organizationMember: OrganizationMember;
    allRoles: OrganizationRoleInfo[];


    constructor(private organizationService: OrganizationService,
                private alertController: AlertController,
                private actionSheetController: ActionSheetController,
                private modalController: ModalController,
                private tokenStorageService: TokenStorageService,
                private properties: PropertiesService) {
    }

    async ngOnInit() {
        this.getData();
    }

    async getData() {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.organizationService.getOrganizationMember(this.organizationId, this.memberId).pipe(
            tap((data) => this.organizationMember = data),
            mergeMap(() => this.organizationService.getOrganizationRoles(this.organizationId))
        ).subscribe((roles) => {
            loading.dismiss();
            this.allRoles = roles;
        }, error => {
            loading.dismiss();
        });
    }

    back() {
        this.modalController.dismiss();
    }

    // getAnotherRoles() {
    //     return this.allRoles
    //         .filter(role => this.organizationMember.roles.findIndex(memberRole => memberRole.id === role.id) < 0);
    // }
}
