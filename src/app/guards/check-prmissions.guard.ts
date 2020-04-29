import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {PropertiesService} from '../services/properties.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CheckPrmissionsGuard implements CanActivate {

    constructor(private userService: UserService,
                private properties: PropertiesService) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        let answer;
        await this.userService.checkPermissions(this.properties.getCurrentOrganizationId()).subscribe(() =>
            answer = true
        ,
            () => answer = false);
        return answer;
    }

}
