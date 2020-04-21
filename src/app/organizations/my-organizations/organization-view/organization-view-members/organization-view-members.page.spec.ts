import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganizationViewMembersPage } from './organization-view-members.page';

describe('OrganizationViewMembersPage', () => {
  let component: OrganizationViewMembersPage;
  let fixture: ComponentFixture<OrganizationViewMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationViewMembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationViewMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
