import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrganizationMember} from '../../../../models/organization/organization-member';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../../services/organization.service';
import {PropertiesService} from '../../../../services/properties.service';
import {AlertController} from '@ionic/angular';
import {loadingController} from '@ionic/core';

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
                private alertController: AlertController) {
    }

    async ngOnInit() {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.getSubscription = this.organizationService.getMembers(this.properties.getCurrentOrganizationId())
            .subscribe((data: OrganizationMember[]) => {
                loading.dismiss();
                this.members = data;
            },
                async error => {
                    await loading.dismiss();

                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: `${error.error.message}`,
                        buttons: ['OK']
                    });
                    await alert.present();
                });
    }

    ngOnDestroy(): void {
        this.getSubscription.unsubscribe();
    }
}
