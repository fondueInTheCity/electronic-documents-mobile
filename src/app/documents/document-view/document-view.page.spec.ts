import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentViewPage } from './document-view.page';

describe('DocumentViewPage', () => {
  let component: DocumentViewPage;
  let fixture: ComponentFixture<DocumentViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
