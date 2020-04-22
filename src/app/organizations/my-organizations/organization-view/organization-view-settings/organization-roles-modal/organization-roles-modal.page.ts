import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../../services/organization.service';
import {OrganizationRoleInfo} from '../../../../../models/organization/organization-role-info';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {CreateOrganizationRole} from '../../../../../models/organization/create-organization-role';
import {PropertiesService} from '../../../../../services/properties.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-organization-roles-modal',
    templateUrl: './organization-roles-modal.page.html',
    styleUrls: ['./organization-roles-modal.page.scss'],
})
export class OrganizationRolesModalPage implements OnInit, OnDestroy {
    @Input() organizationId;
    organizationRoles: OrganizationRoleInfo[];
    getSubscription: Subscription;
    createSubscription: Subscription;
    deleteSubscription: Subscription;
    renameSubscription: Subscription;

    constructor(private organizationService: OrganizationService,
                private alertController: AlertController,
                private actionSheetController: ActionSheetController,
                private modalController: ModalController,
                private properties: PropertiesService) {
    }

    async ngOnInit() {
        this.loadOrganizationRoles();
    }

    async loadOrganizationRoles() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.organizationService.getOrganizationRoles(this.organizationId)
            .subscribe(async (data) => {
                await this.properties.endLoading();
                this.organizationRoles = data;
            }, async error => {
                await this.properties.endLoading();
            });
    }

    async createOrganizationRoleAlert() {
        const alert = await this.alertController.create({
            header: 'Create Organization Role',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Role Name'
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
                    text: 'Create',
                    handler: (value: CreateOrganizationRole) => {
                        this.properties.unsubscribe(this.createSubscription);
                        this.createSubscription = this.organizationService.createOrganizationRole(
                            {name: value.name, organizationId: this.organizationId})
                            .subscribe(() => this.loadOrganizationRoles());
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentActionSheet(roleInfo: OrganizationRoleInfo) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Role Actions',
            buttons: [{
                text: 'Delete',
                role: 'destructive',
                icon: 'trash',
                handler: () => {
                    this.deleteOrganizationRole(roleInfo.id);
                }
            }, {
                text: 'Rename',
                icon: 'share',
                handler: () => {
                    this.openRenameAlert(roleInfo);
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel'
            }]
        });
        await actionSheet.present();
    }

    async deleteOrganizationRole(roleId: number) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.deleteSubscription);
        this.deleteSubscription = this.organizationService.deleteOrganizationRole(roleId).subscribe(async () => {
            await this.properties.endLoading();
            this.loadOrganizationRoles();
        }, async error => {
            await this.properties.endLoading();
        });
    }

    async openRenameAlert(roleInfo: OrganizationRoleInfo) {
        const alert = await this.alertController.create({
            header: 'Rename Organization Role',
            inputs: [
                {
                    name: 'newName',
                    type: 'text',
                    placeholder: 'Role Name',
                    value: roleInfo.name
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Rename',
                    handler: ({newName}) => {
                        this.renameOrganizationRole(roleInfo.id, newName);
                    }
                }
            ]
        });

        await alert.present();
    }

    async renameOrganizationRole(id: number, newName: string) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.renameSubscription);
        this.renameSubscription = this.organizationService.renameOrganizationRole({id, newName})
            .subscribe(async () => {
                await this.properties.endLoading();
                this.loadOrganizationRoles();
            }, async error => {
                await this.properties.endLoading();
            });
    }

    back() {
        this.modalController.dismiss();
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
        this.properties.unsubscribe(this.createSubscription);
        this.properties.unsubscribe(this.deleteSubscription);
        this.properties.unsubscribe(this.renameSubscription);
    }
}
