import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicOrganizationsPage } from './public-organizations.page';

describe('PublicOrganizationsPage', () => {
  let component: PublicOrganizationsPage;
  let fixture: ComponentFixture<PublicOrganizationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicOrganizationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicOrganizationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
