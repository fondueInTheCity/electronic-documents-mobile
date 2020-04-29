import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrganizationInfo} from '../../models/organization/organization-info';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {PropertiesService} from '../../services/properties.service';

@Component({
    selector: 'app-my-organizations',
    templateUrl: './my-organizations.page.html',
    styleUrls: ['./my-organizations.page.scss'],
})
export class MyOrganizationsPage implements OnInit, OnDestroy {
    organizationsInfo = Array<OrganizationInfo>();
    getSubscription: Subscription;

    constructor(private userService: UserService,
                private tokenStorageService: TokenStorageService,
                private properties: PropertiesService) {
    }

    async ngOnInit() {
        this.getOrganizations();
    }

    async getOrganizations(event = null) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.userService.getOrganizationsInfo(this.tokenStorageService.getUsername())
            .subscribe(async (organizationsInfo) => {
                    await this.properties.endLoading();
                    this.organizationsInfo = organizationsInfo;
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

    async doRefresh(event) {
        this.getOrganizations(event);
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
    }

    saveOrganizationId(id: number) {
        this.properties.setCurrentOrganizationId(id);
    }
}
