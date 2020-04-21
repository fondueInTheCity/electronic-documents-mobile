import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberViewPage } from './member-view.page';

describe('MemberViewPage', () => {
  let component: MemberViewPage;
  let fixture: ComponentFixture<MemberViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
