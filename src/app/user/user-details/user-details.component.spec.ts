import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController,  } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { EndUser } from '../models/end-user';
import { UserDetailsComponent } from './user-details.component';
import { UserDetailsService } from '../service/user-details.service';
import testData from './test-data.json'

function getUser(){
  return {
    firstName: 'Johnny',
    lastName: 'Jonson',
    address: {
      unit: '32B',
      street: '1st Ave',
      city: 'Brooklyn',
      state: 'NY',
      zip: 1234
    }
  }
}


describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userDetailsService: UserDetailsService
  let user:EndUser = getUser()
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
    userDetailForm.triggerEventHandler('saveUserEvent', user);
    expect(addNewUser).toHaveBeenCalled();
  });
})

describe('UserDetailsComponent Handle Error New', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let user:EndUser = getUser()
  let testCase = testData;
  let httpMock: HttpTestingController
  let userUrl:string = environment.url + environment.user

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
    httpMock = fixture.debugElement.injector.get(HttpTestingController);
  });


  testCase.forEach((test:any) => {
    it(`${test.description}`, () => {
      let componentKey:string = test.testCase.componentKey
      let firstKey:string = test.testCase.firstKey
      let secondKey:string = test.testCase.secondKey;

      const userDetailForm = fixture.debugElement.query(By.css('app-user-details-form'));
      userDetailForm.triggerEventHandler('saveUserEvent', test.formData);
      const request = httpMock.expectOne(userUrl);
      request.flush(test[firstKey][secondKey], test.testCase.response);

      expect(component[componentKey as keyof typeof component]).toEqual(test[firstKey][secondKey]);
    })
  });
})
