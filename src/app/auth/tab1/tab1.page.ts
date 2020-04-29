import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';
import {PropertiesService} from '../../services/properties.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy {
    loginSubscription: Subscription;
    loginFailed = false;

    constructor(private authService: AuthService,
                private router: Router,
                private tokenStorage: TokenStorageService,
                private properties: PropertiesService) {
    }

    async login(form) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.loginSubscription);
        this.loginSubscription = this.authService.attemptAuth(form.value).subscribe(
            async (data) => {
                await this.properties.endLoading();
                this.tokenStorage.saveData(data.token, data.username, data.id);
                this.tokenStorage.saveListId(data.organizationsId);
                this.router.navigate(['/dashboard']);
            },
            async error => {
                await this.properties.endLoading();
                this.properties.getErrorAlertOpts(error);
                this.loginFailed = true;
            }
        );
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.loginSubscription);
    }
}
