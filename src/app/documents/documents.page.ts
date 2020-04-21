import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentService} from '../services/document.service';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {Subscription} from 'rxjs';
import {DocumentInfo} from '../models/documents/document-info';
import {loadingController} from '@ionic/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit, OnDestroy {
    getSubscription: Subscription;
    documentsInfo: DocumentInfo[];

  constructor(private documentsService: DocumentService,
              private tokenStorageService: TokenStorageService,
              private alertController: AlertController) { }

  async ngOnInit() {
      const loading = await loadingController.create({
          message: 'Please wait...'
      });

      await loading.present();
      this.getSubscription = this.documentsService.getUserDocumentsInfo(this.tokenStorageService.getId())
          .subscribe((data) => {
              loading.dismiss();
              this.documentsInfo = data.documentsInfo;
          },
              async error => {
                  await loading.dismiss();

                  const alert = await this.alertController.create({
                      header: 'Error',
                      message: `${error.error.message}`,
                      buttons: ['OK']
                  });
                  await alert.present();

              });
  }

    ngOnDestroy(): void {
        this.getSubscription.unsubscribe();
    }
}
