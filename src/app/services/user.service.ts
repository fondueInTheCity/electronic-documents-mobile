import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDashboard} from '../models/user/UserDashboard';
import {environment} from '../../environments/environment.prod';
import {OrganizationInfo} from '../models/organization/organization-info';
import {OrganizationOffer} from '../models/organization/organization-offer';
import {UserRequestsView} from '../models/user/user-requests-view';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getDashboard(username: string): Observable<UserDashboard> {
        return this.http.get<UserDashboard>(`${environment.serverUrl}/users/${username}/dashboard`);
    }

    updateDashboard(username: string, userDashboard: UserDashboard): Observable<void> {
        return this.http.put<void>(`${environment.serverUrl}/users/${username}/dashboard`, userDashboard);
    }

    getOrganizationsInfo(username: string): Observable<OrganizationInfo[]> {
        return this.http.get<OrganizationInfo[]>(`${environment.serverUrl}/users/${username}/organizations`);
    }

    getOrganizationsOffers(username: string): Observable<UserRequestsView> {
        return this.http.get<UserRequestsView>(`${environment.serverUrl}/users/${username}/offers`);
    }

    checkPermissions(organizationId: number): Observable<void> {
        return this.http.get<void>(`${environment.serverUrl}/users/${organizationId}`);
    }
}
