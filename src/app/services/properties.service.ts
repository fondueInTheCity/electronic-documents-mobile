import {Injectable} from '@angular/core';
import {LoadingOptions} from '@ionic/core/dist/types/components/loading/loading-interface';
import {loadingController} from '@ionic/core';
import {Subscription} from 'rxjs';
import {AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PropertiesService {
    currentOrganizationId: number;
    loadingOptions: LoadingOptions = {
        message: 'Please wait...'
    };
    loading: HTMLIonLoadingElement;

    constructor(private alertController: AlertController) {
    }

    getCurrentOrganizationId(): number {
        return this.currentOrganizationId;
    }

    setCurrentOrganizationId(organizationId: number) {
        this.currentOrganizationId = +organizationId;
    }

    async startLoading() {
        this.loading = await loadingController.create(this.loadingOptions);
        await this.loading.present();
    }

    async endLoading() {
        await this.loading.dismiss();
    }

    unsubscribe(subscription: Subscription) {
        if (subscription && !subscription.closed) {
            subscription.unsubscribe();
        }
    }

    async startAlert(opts) {
        const alert = await this.alertController.create(opts);
        await alert.present();
    }

    getErrorAlertOpts(error: string) {
        return {
            header: 'Error',
            message: error,
            buttons: ['OK']
        };
    }

    getKeys(enumType): string[] {
        return Object.keys(enumType).filter(k => typeof enumType[k as any] === 'number');
    }
}
