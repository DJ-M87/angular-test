import { Component, OnInit } from '@angular/core';
import { EndUser } from '../models/end-user';
import { UserDetailsService } from '../service/user-details.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user?:EndUser
  error?:number

  constructor(private userService:UserDetailsService) {
   }

  ngOnInit(): void {
  }

  addNewUser(newUser:EndUser){
    this.userService.addNewUser(newUser).subscribe({
      next: (user:EndUser)=> {
        this.user = user;
      },
      error: (error) => {
        this.error = error.status
      }
    })
  }
}
