import { ComponentFixture, TestBed , fakeAsync, tick} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { By } from '@angular/platform-browser';
import { EndUser } from '../models/end-user';
import { UserDetailsService } from '../service/user-details.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Observable, throwError } from 'rxjs';
import testData from './test-data.json'


describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userDetailsService: UserDetailsService
  let user:EndUser = testData;
  let addNewUserStub: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        UserDetailsComponent,
      ],
      providers: [
        UserDetailsService
      ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userDetailsService = fixture.debugElement.injector.get(UserDetailsService);
    addNewUserStub = spyOn(userDetailsService, 'addNewUser');

  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Renders an independent user-details-form', () => {
    const { debugElement } = fixture;
    const userDetailForm = debugElement.query(By.css('app-user-details-form'));
    expect(userDetailForm).toBeTruthy();
  });

  it('Listen to newUserEvent change', () => {
    let addNewUser = spyOn(component, 'addNewUser')
    addNewUserStub.and.callFake(() => {return of(user)});
    const userDetailForm = fixture.debugElement.query(By.css('app-user-details-form'));
    userDetailForm.triggerEventHandler('newUserEvent', user);
    expect(addNewUser).toHaveBeenCalled();
  });

  it('AddNewUser called with changed data', () => {
    addNewUserStub.and.callFake(() => {return of(user)});
    const userDetailForm = fixture.debugElement.query(By.css('app-user-details-form'));
    userDetailForm.triggerEventHandler('newUserEvent', user);
    expect(addNewUserStub).toHaveBeenCalledWith(user);
    expect(component.user).toEqual(user);
  });
})
