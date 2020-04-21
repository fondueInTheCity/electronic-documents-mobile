import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, NgForm, NgModel} from '@angular/forms';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../services/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {DocumentType} from '../../models/enum/DocumentType';
import {loadingController} from '@ionic/core';
import {AlertController} from '@ionic/angular';

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
                private activatedRoute: ActivatedRoute,
                private tokenService: TokenStorageService,
                private router: Router,
                private fb: FormBuilder,
                private alertController: AlertController) {
    }

    async onSubmit() {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });

        await loading.present();
        this.createSubscription = this.organizationService.createOrganization(this.organizationForm.value)
            .subscribe(() => {
                loading.dismiss();
                this.router.navigate(['./../organizations']);
            },
                async error => {
                    await loading.dismiss();

                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: `${error.error.message}`,
                        buttons: ['OK']
                    });
                    await alert.present();
                }
        );
    }

    ngOnDestroy(): void {
        if (this.createSubscription) {
            this.createSubscription.unsubscribe();
        }
    }

    getTypes(): string[] {
        return Object.keys(DocumentType).filter(k => typeof DocumentType[k as any] === 'number');
    }
}
