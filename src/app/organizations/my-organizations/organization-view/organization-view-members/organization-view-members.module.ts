import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OrganizationViewMembersPageRoutingModule} from './organization-view-members-routing.module';

import {OrganizationViewMembersPage} from './organization-view-members.page';
import {MemberViewPageModule} from './member-view/member-view.module';
import {MemberViewPage} from './member-view/member-view.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        OrganizationViewMembersPageRoutingModule,
        MemberViewPageModule
    ],
    declarations: [OrganizationViewMembersPage],
    entryComponents: [MemberViewPage]
})
export class OrganizationViewMembersPageModule {
}
