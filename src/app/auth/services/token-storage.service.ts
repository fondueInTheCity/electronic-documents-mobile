import {Injectable} from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_KEY = 'AuthId';
const LIST = 'list';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    private roles: Array<string> = [];

    constructor() {
    }

    signOut() {
        window.sessionStorage.clear();
    }

    public saveData(token: string, username: string, id: number) {
        this.saveToken(token);
        this.saveUsername(username);
        this.saveId(id);
    }

    public clearData() {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(USERNAME_KEY);
        window.sessionStorage.removeItem(AUTHORITIES_KEY);
        window.sessionStorage.removeItem(ID_KEY);
        window.sessionStorage.removeItem(LIST);
    }

    public saveToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUsername(username: string) {
        window.sessionStorage.removeItem(USERNAME_KEY);
        window.sessionStorage.setItem(USERNAME_KEY, username);
    }

    public getUsername(): string {
        return sessionStorage.getItem(USERNAME_KEY);
    }

    public saveAuthorities(authorities: string[]) {
        window.sessionStorage.removeItem(AUTHORITIES_KEY);
        window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }

    public saveId(id: number) {
        window.sessionStorage.removeItem(ID_KEY);
        window.sessionStorage.setItem(ID_KEY, id.toString());
    }

    getId(): number {
        return +sessionStorage.getItem(ID_KEY);
    }

    public getAuthorities(): string[] {
        this.roles = [];

        if (sessionStorage.getItem(TOKEN_KEY)) {
            JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
                this.roles.push(authority.authority);
            });
        }

        return this.roles;
    }

    public isAuthorised(): boolean {
        const token = this.getToken();
        const username = this.getUsername();

        return token && token !== '' && username && username !== '';
    }

    saveListId(organizationsId: number[]) {
        window.sessionStorage.removeItem(LIST);
        window.sessionStorage.setItem(LIST, JSON.stringify(organizationsId));
    }

    addNewOrganizationId(organizationId: number) {
        const list: number[] = JSON.parse(sessionStorage.getItem(LIST));
        list.push(organizationId);
        this.saveListId(list);
    }

    hasPermissions(organizationId: number) {
        if (sessionStorage.getItem(LIST)) {
            return JSON.parse(sessionStorage.getItem(LIST)).findIndex(val => val === organizationId) >= 0;
        }
        return false;
    }
}
