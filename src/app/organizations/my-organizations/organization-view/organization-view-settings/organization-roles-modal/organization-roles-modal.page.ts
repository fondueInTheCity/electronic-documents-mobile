import {Component, Input, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../../services/organization.service';
import {OrganizationRoleInfo} from '../../../../../models/organization/organization-role-info';
import {loadingController} from '@ionic/core';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {CreateOrganizationRole} from '../../../../../models/organization/create-organization-role';

@Component({
    selector: 'app-organization-roles-modal',
    templateUrl: './organization-roles-modal.page.html',
    styleUrls: ['./organization-roles-modal.page.scss'],
})
export class OrganizationRolesModalPage implements OnInit {
    @Input() organizationId;
    organizationRoles: OrganizationRoleInfo[];

    constructor(private organizationService: OrganizationService,
                private alertController: AlertController,
                private actionSheetController: ActionSheetController,
                private modalController: ModalController) {
    }

    async ngOnInit() {
        this.loadOrganizationRoles();
    }

    async loadOrganizationRoles() {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.organizationService.getOrganizationRoles(this.organizationId).subscribe((data) => {
            loading.dismiss();
            this.organizationRoles = data;
        }, error => {
            loading.dismiss();
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
                        this.organizationService.createOrganizationRole({name: value.name, organizationId: this.organizationId})
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
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.organizationService.deleteOrganizationRole(roleId).subscribe(() => {
            loading.dismiss();
            this.loadOrganizationRoles();
        }, error => {
            loading.dismiss();
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
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.organizationService.renameOrganizationRole({id, newName}).subscribe(() => {
            loading.dismiss();
            this.loadOrganizationRoles();
        }, error => {
            loading.dismiss();
        });
    }

    back() {
        this.modalController.dismiss();
    }
}
