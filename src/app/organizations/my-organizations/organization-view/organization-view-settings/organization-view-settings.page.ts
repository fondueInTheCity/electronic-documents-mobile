import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../../services/organization.service';
import {Subscription} from 'rxjs';
import {OrganizationSettings} from '../../../../models/organization/organization-settings';
import {FormBuilder} from '@angular/forms';
import {PropertiesService} from '../../../../services/properties.service';
import {DocumentType} from '../../../../models/enum/DocumentType';
import {AlertController, ModalController} from '@ionic/angular';
import {loadingController} from '@ionic/core';
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
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.getSubscription = this.service.getOrganizationSettings(this.organizationId).subscribe((data) => {
                loading.dismiss();
                this.organizationSettings = data;
                this.generalForm.reset(data);
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

    async onSubmit() {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.updateSubscription = this.service.updateOrganizationSettings(this.organizationId, this.generalForm.value)
            .subscribe(() => {
                    loading.dismiss();
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

    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            header: 'Create Join Private Token',
            inputs: [
                {
                    name: 'username',
                    type: 'text',
                    placeholder: 'Username'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Ok',
                    handler: (value: GenerateOrganizationJoinJwt) => {
                        this.service.createOrganizationJwtToken({username: value.username, organizationId: this.organizationId})
                            .subscribe((data) => this.jwtPrivateJoinToken = data);
                    }
                }
            ]
        });

        await alert.present();
    }

    getTypes(): string[] {
        return Object.keys(DocumentType).filter(k => typeof DocumentType[k as any] === 'number');
    }

    ngOnDestroy(): void {
        this.getSubscription.unsubscribe();
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
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
