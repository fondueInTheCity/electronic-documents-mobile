import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../../services/organization.service';
import {Subscription} from 'rxjs';
import {OrganizationSettings} from '../../../../models/organization/organization-settings';
import {FormBuilder} from '@angular/forms';
import {PropertiesService} from '../../../../services/properties.service';
import {DocumentType} from '../../../../models/enum/DocumentType';
import {AlertController, ModalController} from '@ionic/angular';
import {GenerateOrganizationJoinJwt} from '../../../../models/generate-organization-join-jwt';
import {PrivateJoinToken} from '../../../../models/private-join-token';
import {OrganizationRolesModalPage} from './organization-roles-modal/organization-roles-modal.page';

@Component({
    selector: 'app-organization-view-settings',
    templateUrl: './organization-view-settings.page.html',
    styleUrls: ['./organization-view-settings.page.scss'],
})
export class OrganizationViewSettingsPage implements OnInit, OnDestroy {
    getSubscription: Subscription;
    updateSubscription: Subscription;
    organizationSettings: OrganizationSettings;
    organizationId: number;
    jwtPrivateJoinToken: PrivateJoinToken;
    generalForm = this.fb.group({
        id: [],
        name: [],
        organizationType: []
    });

    constructor(private activatedRoute: ActivatedRoute,
                private service: OrganizationService,
                private fb: FormBuilder,
                private properties: PropertiesService,
                private alertController: AlertController,
                private modalController: ModalController) {
    }

    async ngOnInit() {
        this.organizationId = this.properties.getCurrentOrganizationId();
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.service.getOrganizationSettings(this.organizationId).subscribe(async (data) => {
                await this.properties.endLoading();
                this.organizationSettings = data;
                this.generalForm.reset(data);
            },
            async error => {
                await this.properties.endLoading();
                this.properties.getErrorAlertOpts(error);
            });
    }

    async onSubmit() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.updateSubscription);
        this.updateSubscription = this.service.updateOrganizationSettings(this.organizationId, this.generalForm.value)
            .subscribe(async () => {
                    await this.properties.endLoading();
                },
                async error => {
                    await this.properties.endLoading();
                    this.properties.getErrorAlertOpts(error);
                });
    }

    getTypes(): string[] {
        return this.properties.getKeys(DocumentType);
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.updateSubscription);
        this.properties.unsubscribe(this.getSubscription);
    }

    async presentRolesModal() {
        const modal = await this.modalController.create({
            component: OrganizationRolesModalPage,
            componentProps: {
                organizationId: this.organizationId
            }
        });
        return await modal.present();
    }
}
