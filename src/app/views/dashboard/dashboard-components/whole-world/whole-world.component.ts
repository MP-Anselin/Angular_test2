import {Component, OnInit} from '@angular/core';
import {FriendListService} from "../../../../services/friend-list.service";
import {UserService} from "../../../../services/user.service";
import {IUserCard} from "../../../../services/clients/interfaces/user.interface";
import {IFriendCard} from "../../../../services/clients/interfaces/friend.interface";

@Component({
  selector: 'app-whole-world',
  templateUrl: './whole-world.component.html',
  providers: [FriendListService, UserService]
})
export class WholeWorldComponent implements OnInit {
  public userList!: IUserCard[];
  public friendList!: IFriendCard[];

  constructor(
    private friendListService: FriendListService,
    private userService: UserService
  ) {
    this.setList();
  }

  ngOnInit(): void {
  }


  friendshipStatus(id: string) {
    if (this.friendListService.findFriend(id, this.friendList))
      return "friend";
    else
      return "send invitation";
  }

  sendFriendShipInvitation(id: string): void {
    const findUser = this.userList.find((el: IUserCard) => {
      return el._id === id;
    })
    if (findUser && !this.friendListService.findFriend(id, this.friendList)) {
      this.friendListService.addFriend(findUser._id);
    }
  }

  getTime(oldTime: string){
    const newDate = Date.now();
    const oldDate = new Date(oldTime).getTime();
    const diff = Math.abs(oldDate - newDate);
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days > 1 ? `${days} days` : `${days} day`
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

  private toTimestamp(strDate: string) : number {
    const dt = new Date(strDate).getTime();
    return dt / 1000;
  };


  private setList() {
    this.friendListService
      .getFriendList()
      .subscribe((friends: IFriendCard[]) => {
        this.friendListService.allFriend = friends
        this.friendList = friends;
      });
    this.userService
      .getUser()
      .subscribe((userList: IUserCard[]) => {
        this.userService.allUser = userList;
        this.userList = userList;
      });
  }
}
