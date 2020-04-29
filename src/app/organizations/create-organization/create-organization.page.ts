import {Component, OnDestroy} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../services/organization.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {DocumentType} from '../../models/enum/DocumentType';
import {PropertiesService} from '../../services/properties.service';

@Component({
    selector: 'app-create-organization',
    templateUrl: './create-organization.page.html',
    styleUrls: ['./create-organization.page.scss'],
})
export class CreateOrganizationPage implements OnDestroy {
    organizationForm = this.fb.group({
        name: [],
        type: [],
        ownerUsername: [this.tokenService.getUsername()]
    });
    createSubscription: Subscription;

    constructor(private organizationService: OrganizationService,
                private tokenService: TokenStorageService,
                private router: Router,
                private fb: FormBuilder,
                private properties: PropertiesService) {
    }

    async onSubmit() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.createSubscription);
        this.createSubscription = this.organizationService.createOrganization(this.organizationForm.value).subscribe(async (id) => {
            this.tokenService.addNewOrganizationId(id);
            await this.properties.endLoading();
            this.router.navigate(['./../organizations']);
        }, async error => {
            await this.properties.endLoading();
            this.properties.getErrorAlertOpts(error);
        });
    }

    getTypes(): string[] {
        return this.properties.getKeys(DocumentType);
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.createSubscription);
    }
}
