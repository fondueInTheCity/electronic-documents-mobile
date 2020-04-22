import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../services/organization.service';
import {FormBuilder} from '@angular/forms';
import {PropertiesService} from '../../services/properties.service';

@Component({
  selector: 'app-join-to-organization',
  templateUrl: './join-to-organization.page.html',
  styleUrls: ['./join-to-organization.page.scss'],
})
export class JoinToOrganizationPage implements OnDestroy {
    joinSubscription: Subscription;
    joinForm = this.fb.group({
        token: []
    });

    constructor(private service: OrganizationService,
                private fb: FormBuilder,
                private properties: PropertiesService) {
    }

    async onSubmit() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.joinSubscription);
        this.joinSubscription = this.service.privateJoin(this.joinForm.value)
            .subscribe(async () => {
                    await this.properties.endLoading();
                },
                async error => {
                    await this.properties.endLoading();
                    this.properties.getErrorAlertOpts(error);
                });
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.joinSubscription);
    }
}
