import {Component} from '@angular/core';
import {FriendListService} from "../../../../services/friend-list.service";
import {IFriendCard} from "../../../../services/clients/interfaces/friend.interface";
import {IUserCard} from "../../../../services/clients/interfaces/user.interface";
import {UserService} from "../../../../services/user.service";
import {AuthenticationService} from "../../../../services/authentication.service";


@Component({
  selector: 'app-friend-list',
  templateUrl: 'friend-list.component.html',
  providers: [FriendListService, UserService]
})
export class FriendListComponents {
  public friendList: IUserCard[] = [];

  constructor(
    private friendListService: FriendListService,
    private userService: UserService,
  ) {
    this.setFriendList();
  }

  ngOnInit() {

  }

  private setFriendList() {
    this.friendListService
      .getFriendList()
      .subscribe((friends: IFriendCard[]) => {
        this.userService
          .getUser()
          .subscribe((userList: IUserCard[]) => {
            friends.forEach((friendCard) => {
              userList.forEach((user) => {
                if (user._id == friendCard.friend_id) {
                  this.friendList.push(user);
                }
              })
            })
          });
      });
  }


  deleteFriend(id: string): void {
    this.friendListService.removeFriend(id);
    this.friendList = this.friendList.filter(friend => friend._id !== id);
  }

  setStatusState(value: number) {
    switch (value) {
      default:
      case 0:
        return "danger";
      case 1:
        return "success";
      case 2:
        return "warning";
    }
  }
}
