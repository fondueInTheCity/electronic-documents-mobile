import {Component, OnDestroy} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../services/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {DocumentType} from '../../models/enum/DocumentType';
import {AlertController} from '@ionic/angular';
import {PropertiesService} from '../../services/properties.service';
import {tap} from 'rxjs/operators';

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
        this.properties.unsubscribe(this.createSubscription);
        this.createSubscription = this.organizationService.createOrganization(this.organizationForm.value).pipe(
            tap(async () => await this.properties.startLoading())
        ).subscribe(async () => {
            await this.properties.endLoading();
        }, async error => {
            await this.properties.endLoading();
            this.properties.getErrorAlertOpts(error);
        }, async () => {
            this.router.navigate(['./../organizations']);
        });
    }

    getTypes(): string[] {
        return this.properties.getKeys(DocumentType);
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.createSubscription);
    }
}
