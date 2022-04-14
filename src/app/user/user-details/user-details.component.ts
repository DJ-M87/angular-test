import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { EndUser } from '../models/end-user';
import { UserDetailsService } from '../service/user-details.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user?:EndUser
  errorCode?:number
  errorMessage?:string
  sub?: Subscription;

  editUser:EndUser = {
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
  constructor(private userService:UserDetailsService) {
   }

  ngOnInit(): void {
  }

  addNewUser(newUser:EndUser){
    this.sub = this.userService.addNewUser(newUser).subscribe({
      next: (user:EndUser)=> {
        this.user = user;
      },
      error: (error) => {
        this.errorCode = error.status
        this.errorMessage = error.error
      }
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe
  }


  // if you have more then one subscription you can use and you want to destroy them you can use SubSink
  // subs = SubSink();
  // subs = this.service1.somefunction1.subscribe();
  // subs = this.service2.somefunction2.subscribe();
  // subs = this.service2.somefunction3.subscribe();
  // subs.unsubscribe;
  // install with -> npm install subsink

}
