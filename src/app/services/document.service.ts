import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrganizationDocumentsInfo} from '../models/documents/organization-documents-info';
import {environment} from '../../environments/environment.prod';
import {OrganizationDocumentView} from '../models/documents/organization-document-view';
import {UserDocumentsInfo} from '../models/documents/user-documents-info';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

    getMyOrganizationDocumentsInfo(organizationId: number, userId: number): Observable<OrganizationDocumentsInfo> {
        return this.http.get<OrganizationDocumentsInfo>(`${environment.serverUrl}/documents/organization/${organizationId}/user/${userId}`);
    }

    upload(file: File, organizationId: number, userId: number): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', `${environment.serverUrl}/documents/organization/${organizationId}/user/${userId}`,
            formData, {
                reportProgress: true,
                responseType: 'json'
            });

        return this.http.request(req);
    }

    getDocumentView(documentId: number): Observable<OrganizationDocumentView> {
        return this.http.get<OrganizationDocumentView>(`${environment.serverUrl}/documents/${documentId}`);
    }

    getUserDocumentsInfo(userId: number): Observable<UserDocumentsInfo> {
        return this.http.get<UserDocumentsInfo>(`${environment.serverUrl}/documents/user/${userId}`);
    }
}
