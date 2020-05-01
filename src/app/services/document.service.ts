import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrganizationDocumentsInfo} from '../models/documents/organization-documents-info';
import {environment} from '../../environments/environment.prod';
import {OrganizationDocumentView} from '../models/documents/organization-document-view';
import {UserDocumentsInfo} from '../models/documents/user-documents-info';
import {HeapDocumentView} from '../models/documents/heap-document-view';
import {WaitingDocumentView} from '../models/documents/waiting-document-view';
import {JoinToMeDocumentView} from '../models/documents/join-to-me-document-view';
import {DocumentAnswer} from '../models/documents/document-answer';
import {AnsweredDocumentView} from '../models/documents/answered-document-view';
import {PendingDocumentView} from '../models/documents/pending-document-view';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    constructor(private http: HttpClient) {
    }

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

    getHeapDocument(documentId: number): Observable<HeapDocumentView> {
        return this.http.get<HeapDocumentView>(`${environment.serverUrl}/documents/${documentId}/heap`);
    }

    downloadDocument(documentId: number): Observable<Blob> {
        return this.http.post<Blob>(`${environment.serverUrl}/documents/user/${documentId}`, {},
            {responseType: 'blob' as 'json'});
    }

    approveUserHeapDocument(value: HeapDocumentView): Observable<void> {
        return this.http.post<void>(`${environment.serverUrl}/documents/${value.id}/heap`, value);
    }

    getWaitingDocument(documentId: number): Observable<WaitingDocumentView> {
        return this.http.get<WaitingDocumentView>(`${environment.serverUrl}/documents/${documentId}/waiting`);
    }

    getJoinToMeDocument(documentId: number): Observable<JoinToMeDocumentView> {
        return this.http.get<JoinToMeDocumentView>(`${environment.serverUrl}/documents/${documentId}/join-to-me`);
    }

    downloadDocumentForCheck(documentId: number): Observable<any> {
        return this.http.post<any>(`${environment.serverUrl}/documents/${documentId}/join-to-me/download`, {},
            {reportProgress: true, responseType: 'blob' as 'json'});
    }

    sendAnswer(documentId: number, answer: DocumentAnswer): Observable<void> {
        return this.http.post<void>(`${environment.serverUrl}/documents/${documentId}/join-to-me/answer`, answer);
    }

    getAnsweredDocument(documentId: number): Observable<AnsweredDocumentView> {
        return this.http.get<AnsweredDocumentView>(`${environment.serverUrl}/documents/${documentId}/answered`);
    }

    getPendingDocument(documentId: number): Observable<PendingDocumentView> {
        return this.http.get<PendingDocumentView>(`${environment.serverUrl}/documents/${documentId}/progress`);
    }
}
