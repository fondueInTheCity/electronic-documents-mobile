import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyOrganizationsPage } from './my-organizations.page';

describe('MyOrganizationsPage', () => {
  let component: MyOrganizationsPage;
  let fixture: ComponentFixture<MyOrganizationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrganizationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyOrganizationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
