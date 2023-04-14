import { Component, AfterViewInit } from '@angular/core';
import {FriendListService} from "../../services/friend-list.service";
import {UserService} from "../../services/user.service";
import {IUserCard} from "../../services/clients/interfaces/user.interface";
import {IFriendCard} from "../../services/clients/interfaces/friend.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  templateUrl: './dashboard.component.html',
  providers: [FriendListService, UserService]
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  signupForm: FormGroup;
  constructor(
    private userService: UserService,
    private friendListService: FriendListService,
    private fb: FormBuilder,
    private authService: AuthenticationService
    ) {
    this.userService
      .getUser()
      .subscribe((userList: IUserCard[]) => {
        this.userService.allUser = userList;
      });

    this.friendListService
      .getFriendList()
      .subscribe((friends: IFriendCard[]) => {
        this.friendListService.allFriend = friends;
      });
    this.subtitle = 'This is some text within a card block.';


    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['JimmyTest1', Validators.required],
      email: ['', Validators.required],
      userRole: ['JimmyTest', Validators.required],
      age: [24],
      image: ['assets/images/users/user1.jpg'],
      password: ['JimmyTest48', Validators.required],
      isLog: [false],
      status: [1]
    });
  }

  sendEmailToNewUser() {
    console.log("this.signupForm.value => ", this.signupForm.value);
    this.authService.register(this.signupForm.value);
  }


  ngAfterViewInit() { }
}
