import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinToOrganizationPage } from './join-to-organization.page';

describe('JoinToOrganizationPage', () => {
  let component: JoinToOrganizationPage;
  let fixture: ComponentFixture<JoinToOrganizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinToOrganizationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinToOrganizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
