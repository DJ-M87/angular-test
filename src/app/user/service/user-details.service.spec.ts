import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { UserDetailsService } from './user-details.service';
import { EndUser } from '../models/end-user';
import testData from './test-data.json'


describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let service : UserDetailsService
  let user:EndUser = testData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers : [ UserDetailsService ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserDetailsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Test post new user',async () => {
      service.addNewUser(user).subscribe((data:EndUser)=> {
      expect(data).toBe(user);
    })
    const request = httpMock.expectOne( 'http://fake-url.test/user');
    expect(request.request.method).toBe('POST');
    request.flush(user);

  })

  it('Test post new user with error 400 Bad Request',async () => {
    const message:string = "Could not add new user";
    service.addNewUser(user).subscribe({
      error: (error) => {
        expect(error.status).toEqual(400)
      }
    })
    const request = httpMock.expectOne( 'http://fake-url.test/user');
    request.flush(message, { status: 400, statusText: 'Bad Request' });
  })
});

