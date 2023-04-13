import { Component, AfterViewInit } from '@angular/core';
import {FriendListService} from "../../services/friend-list.service";
import {UserService} from "../../services/user.service";
import {IUserCard} from "../../services/clients/interfaces/user.interface";
import {IFriendCard} from "../../services/clients/interfaces/friend.interface";

@Component({
  templateUrl: './dashboard.component.html',
  providers: [FriendListService, UserService]
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private userService: UserService, private friendListService: FriendListService) {
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
  }

  ngAfterViewInit() { }
}
