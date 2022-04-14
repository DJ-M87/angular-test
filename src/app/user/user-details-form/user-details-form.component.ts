import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EndUser } from '../models/end-user';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css']
})
export class UserDetailsFormComponent implements OnInit {

  firstNamePattern = /^[A-Z](.*[a-zA-Z -])$/;
  lastNamePattern = /^[A-Z](.*[a-zA-Z -])$/;
  streetPattern = /^[A-Z0-9](.*[a-zA-Z0-9 -.])$/;
  cityPattern = /^[A-Z](.*[a-zA-Z -])$/;
  statePattern = /^[A-Z](.*[a-zA-Z -])$/;
  zipPattern = /^[0-9]{4}$/;

  profileForm:FormGroup


  @Input() endUser:EndUser = {};
  @Output() saveUserEvent = new EventEmitter<EndUser>();

  constructor(private fb: FormBuilder) {
    this.profileForm = this.generateForm();
   }

  ngOnInit(): void {
    this.updatedForm(this.endUser)
  }

  updatedForm(endUser:EndUser){
    this.profileForm.patchValue(endUser);
  }

  generateForm() {
    return this.fb.group({
      firstName: [ '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(this.firstNamePattern)
      ]

    ],
      lastName: ['', [
        Validators.required,
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(this.lastNamePattern)

      ]],
      address: this.fb.group({
        unit: [''],
        street: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(this.streetPattern)
        ]],
        city: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(this.cityPattern)
        ]],
        state: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(this.statePattern)
        ]],
        zip: ['', [
          Validators.required,
          Validators.pattern(this.zipPattern)
        ]]
      }),
    });
  }

  onSubmit() {
    let newUser:EndUser = this.profileForm?.value
    this.saveUserEvent.emit(newUser)
  }

}
