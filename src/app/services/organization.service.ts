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
import {CreateOrganizationRole} from '../models/organization/create-organization-role';
import {RenameOrganizationRole} from '../models/organization/RenameOrganizationRole';
import {OrganizationRequestsView} from '../models/organization/organization-requests-view';
import {AddRole} from '../models/add-role';
import {RemoveRole} from '../models/remove-role';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private http: HttpClient) {
    }

    createOrganization(organizationCreate: OrganizationCreate): Observable<number> {
        return this.http.post<number>(`${environment.serverUrl}/organizations`, organizationCreate);
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

    getOrganizationOffers(organizationId: number): Observable<OrganizationRequestsView> {
        return this.http.get<OrganizationRequestsView>(`${environment.serverUrl}/organizations/${organizationId}/offers`);
    }

    answerOffer(answer: OrganizationAnswerOffer): Observable<void> {
        return this.http.put<void>(`${environment.serverUrl}/organizations/offers`, answer);
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

    createOrganizationRequest(createOrganizationRequest: CreateOrganizationRequest): Observable<void> {
        return this.http.post<void>(`${environment.serverUrl}/organizations/organization-request/create`, createOrganizationRequest);
    }

    getOrganizationRoles(organizationId: number): Observable<OrganizationRoleInfo[]> {
        return this.http.get<OrganizationRoleInfo[]>(`${environment.serverUrl}/organizations/${organizationId}/roles`);
    }

    createOrganizationRole(createOrganizationRole: CreateOrganizationRole): Observable<void> {
        return this.http.post<void>(`${environment.serverUrl}/organizations/roles/create`, createOrganizationRole);
    }

    deleteOrganizationRole(organizationRoleId: number): Observable<void> {
        return this.http.delete<void>(`${environment.serverUrl}/organizations/roles/${organizationRoleId}`);
    }

    renameOrganizationRole(renameOrganizationRole: RenameOrganizationRole): Observable<void> {
        return this.http.put<void>(`${environment.serverUrl}/organizations/roles/rename`, renameOrganizationRole);
    }

    getOrganizationMember(organizationId: number, userId: number): Observable<OrganizationMember> {
        return this.http.get<OrganizationMember>(`${environment.serverUrl}/organizations/${organizationId}/members/${userId}`);
    }

    addRole(organizationId: number, memberId: number, value: AddRole): Observable<void> {
        return this.http.post<void>(`${environment.serverUrl}/organizations/${organizationId}/members/${memberId}/roles`, value);
    }

    deleteRole(organizationId: number, memberId: number, id: number): Observable<void> {
        return this.http.delete<void>(`${environment.serverUrl}/organizations/${organizationId}/members/${memberId}/roles/${id}`);
    }
}
