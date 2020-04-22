import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {PropertiesService} from '../../services/properties.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnDestroy {
    signUpSubscription: Subscription;

    constructor(private authService: AuthService,
                private router: Router,
                private properties: PropertiesService) {
    }

    async register(form) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.signUpSubscription);
        this.authService.signUp(form.value).subscribe(async (res) => {
                await this.properties.endLoading();
                this.router.navigateByUrl('/auth/login');
            },
            async error => {
                await this.properties.endLoading();
                this.properties.getErrorAlertOpts(error);
            });
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.signUpSubscription);
    }
}
