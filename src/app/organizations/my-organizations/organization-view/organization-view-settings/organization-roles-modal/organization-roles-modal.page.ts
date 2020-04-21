import {Component, Input, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../../services/organization.service';

@Component({
    selector: 'app-organization-roles-modal',
    templateUrl: './organization-roles-modal.page.html',
    styleUrls: ['./organization-roles-modal.page.scss'],
})
export class OrganizationRolesModalPage implements OnInit {
    @Input() organizationId;

    constructor(private organizationService: OrganizationService) {
    }

    ngOnInit() {

    }

}
