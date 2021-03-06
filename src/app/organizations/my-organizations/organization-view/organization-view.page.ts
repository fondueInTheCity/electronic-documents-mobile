import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertiesService} from '../../../services/properties.service';
import {TokenStorageService} from '../../../auth/services/token-storage.service';

@Component({
    selector: 'app-organization-view',
    templateUrl: './organization-view.page.html',
    styleUrls: ['./organization-view.page.scss'],
})
export class OrganizationViewPage implements OnInit {
    prevLink = 'organizations/my-organizations/';
    activeLink: string;
    links = ['members', 'documents', 'settings', 'offers'];
    select: any;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private properties: PropertiesService,
                private tokenStorageService: TokenStorageService) {
    }

    ngOnInit() {
        const organizationId = this.activatedRoute.snapshot.params.id;
        this.properties.setCurrentOrganizationId(organizationId);
        this.activeLink = `${this.prevLink}/${organizationId}`;
        this.select = 'members';
        this.route({detail: {value: this.select}});
    }

    route(link) {
        this.router.navigate([this.activeLink, link.detail.value]);
    }

    back() {
        this.router.navigate([this.prevLink]);
    }

    getLinks(): string[] {
        if (this.tokenStorageService.hasPermissions(this.properties.getCurrentOrganizationId())) {
            return ['members', 'documents', 'settings', 'offers'];
        } else {
            return ['members', 'documents'];
        }
    }
}
