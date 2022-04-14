import { ComponentFixture, TestBed} from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsFormComponent } from './user-details-form.component';
import testData from './user-details-form-test-data.json'
import testDataSubmit from './user-details-form-test-data-submit.json'

function patchData(data:any, form:FormGroup){
  form.patchValue(data)
}

describe('UserDetailsFormComponent Field Validation', () => {
  let component: UserDetailsFormComponent;
  let fixture: ComponentFixture<UserDetailsFormComponent>;
  let formgroup: FormGroup;
  let testCases:any = testData;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsFormComponent],
      providers: [
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule        
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formgroup = component.profileForm
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });


  testCases.filter((testFilter:any) => testFilter.testCase.filterData === 'user').forEach(async (test:any)=> {
    it(`${test.testCase.description} as ${test.testCase.testReason} should be "${test.testCase.expectedResult}"`, async () => {
      patchData(test.formData, formgroup);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formgroup.controls[test.testCase.queryName].valid).toBe(test.testCase.expectedResult);
      })
    });
  });

  testCases.filter((testFilter:any) => testFilter.testCase.filterData === 'address').forEach(async (test:any)=> {
    it(`${test.testCase.description} as ${test.testCase.testReason} should be "${test.testCase.expectedResult}`, async () => {
      patchData(test.formData, formgroup);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let address = formgroup.controls['address'] 
        expect(address.get(test.testCase.queryName)?.valid).toBe(test.testCase.expectedResult);
      })
    });
  });
})

describe('UserDetailsFormComponent Submit Form', () => {
  let component: UserDetailsFormComponent;
  let fixture: ComponentFixture<UserDetailsFormComponent>;
  let formgroup: FormGroup;
  let testCases:any = testDataSubmit;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsFormComponent],
      providers: [
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule        
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formgroup = component.profileForm
  });

  testCases.forEach(async (test:any)=> {
    it(`Test case ${test.testCase.description} as ${test.testCase.testReason} should be "${test.testCase.expectedResult}"`, async () => {
      patchData(test.formData, formgroup);
      spyOn(component, 'onSubmit');

      fixture.detectChanges();
      
      let button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      
      fixture.whenStable().then(() => {
        expect(component.onSubmit).toHaveBeenCalledTimes(1);
      })
    });
  });
})
