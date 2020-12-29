import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyUserPage } from './my-user.page';

describe('MyUserPage', () => {
  let component: MyUserPage;
  let fixture: ComponentFixture<MyUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
