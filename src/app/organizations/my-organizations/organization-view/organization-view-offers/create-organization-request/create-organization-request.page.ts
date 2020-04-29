import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../../services/organization.service';
import {AlertController, ModalController} from '@ionic/angular';
import {FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PropertiesService} from '../../../../../services/properties.service';

@Component({
    selector: 'app-create-organization-request',
    templateUrl: './create-organization-request.page.html',
    styleUrls: ['./create-organization-request.page.scss'],
})
export class CreateOrganizationRequestPage implements OnInit, OnDestroy {
    @Input() organizationId;
    createSubscription: Subscription;
    createForm = this.fb.group({
        username: []
    });

    constructor(private organizationService: OrganizationService,
                private fb: FormBuilder,
                private modalController: ModalController,
                private properties: PropertiesService) {
    }

    ngOnInit() {
    }

    back() {
        this.modalController.dismiss();
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.createSubscription);
    }

    onSubmit() {
        this.createSubscription = this.organizationService.createOrganizationRequest({username: this.createForm.value.username,
            organizationId: this.organizationId}).subscribe(
            () => this.back(),
            () => this.back()
        );
    }
}
