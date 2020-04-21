import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PropertiesService {
    currentOrganizationId: number;

    constructor() {
    }

    getCurrentOrganizationId(): number {
        return this.currentOrganizationId;
    }

    setCurrentOrganizationId(organizationId: number) {
        this.currentOrganizationId = organizationId;
    }
}
