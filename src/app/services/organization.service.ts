import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationCreate} from '../models/organization/organization-create';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {OrganizationView} from '../models/organization/organization-view';
import {OrganizationMember} from '../models/organization/organization-member';
import {OrganizationSettings} from '../models/organization/organization-settings';
import {OrganizationOffer} from '../models/organization/organization-offer';
import {OrganizationAnswerOffer} from '../models/documents/organization-answer-offer';
import {OrganizationInfo} from '../models/organization/organization-info';
import {GenerateOrganizationJoinJwt} from '../models/generate-organization-join-jwt';
import {PrivateJoinToken} from '../models/private-join-token';
import {OrganizationRoleInfo} from '../models/organization/organization-role-info';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private http: HttpClient) {
    }

    createOrganization(organizationCreate: OrganizationCreate): Observable<void> {
        return this.http.post<void>(`${environment.serverUrl}/organizations`, organizationCreate);
    }

    getView(organizationId: number): Observable<OrganizationView> {
        return this.http.get<OrganizationView>(`${environment.serverUrl}/organizations/${organizationId}`);
    }

    getMembers(organizationId: number): Observable<OrganizationMember[]> {
        return this.http.get<OrganizationMember[]>(`${environment.serverUrl}/organizations/${organizationId}/members`);
    }

    getOrganizationSettings(organizationId: number): Observable<OrganizationSettings> {
        return this.http.get<OrganizationSettings>(`${environment.serverUrl}/organizations/${organizationId}/settings`);
    }

    updateOrganizationSettings(organizationId: number, organizationSettings: OrganizationSettings): Observable<void> {
        return this.http.put<void>(`${environment.serverUrl}/organizations/${organizationId}/settings`, organizationSettings);
    }

    privateJoin(privateJoinToken: PrivateJoinToken): Observable<void> {
        return this.http.post<void>(`${environment.serverUrl}/organizations/join/private`, privateJoinToken);
    }

    getOrganizationOffers(organizationId: number): Observable<OrganizationOffer[]> {
        return this.http.get<OrganizationOffer[]>(`${environment.serverUrl}/organizations/${organizationId}/offers`);
    }

    answerOffer(organizationId: number, answer: OrganizationAnswerOffer): Observable<void> {
        return this.http.put<void>(`${environment.serverUrl}/organizations/${organizationId}/offers`, answer);
    }

    changeDocumentState(documentId: number, to: string): Observable<void> {
        return this.http.put<void>(`${environment.serverUrl}/documents/${documentId}`, {to});
    }

    approveDenyDocument(documentId: number, answer: boolean): Observable<void> {
        return this.http.put<void>(`${environment.serverUrl}/documents/${documentId}/approveDeny`, {answer});
    }

    getPublicOrganizations(): Observable<OrganizationInfo[]> {
        return this.http.get<OrganizationInfo[]>(`${environment.serverUrl}/organizations/public`);
    }

    createOrganizationJwtToken(value: GenerateOrganizationJoinJwt): Observable<PrivateJoinToken> {
        return this.http.post<PrivateJoinToken>(`${environment.serverUrl}/organizations/generate/private-token`, value);
    }

    createRequest(organizationId: number, userId: number): Observable<void> {
        return this.http.post<void>(`${environment.serverUrl}/organizations/${organizationId}/user/${userId}/request`, {});
    }

    getOrganizationRoles(organizationId: number): Observable<OrganizationRoleInfo[]> {
        return this.http.get<OrganizationRoleInfo[]>(`${environment.serverUrl}/organizations/${organizationId}/roles`);
    }
}
