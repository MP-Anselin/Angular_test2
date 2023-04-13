import {Component, OnInit} from '@angular/core';
import {topcard, topcards} from './top-cards-data';
import {FriendListService} from "../../../../services/friend-list.service";
import {IUserCard} from "../../../../services/clients/interfaces/user.interface";
import {UserService} from "../../../../services/user.service";
import {IFriendCard} from "../../../../services/clients/interfaces/friend.interface";

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
  providers: [FriendListService, UserService]
})
export class TopCardsComponent implements OnInit {
  userList: IUserCard[] = [];
  friendList: IUserCard[] = [];
  topCards: topcard[];

  constructor(private friendListService: FriendListService,
              private userService: UserService) {
    this.topCards = topcards;
    this.setList();
  }

  ngOnInit(): void {
  }

  private setCardValues() {
    let personOnline!: topcard;
    let personDontDisturb!: topcard;
    let friendOnline!: topcard;
    let friendDontDisturb!: topcard;

    topcards.forEach((card) => {
      if (card.subtitle == "Persons on online") {
        personOnline = card;
        personOnline.amount = 0;
      } else if (card.subtitle == "Person dont disturb") {
        personDontDisturb = card
        personDontDisturb.amount = 0;
      } else if (card.subtitle == "Friends online") {
        friendOnline = card;
        friendOnline.amount = 0
      } else if (card.subtitle == "Friends dont disturb") {
        friendDontDisturb = card;
        friendDontDisturb.amount = 0;
      }
    });

    this.userList.forEach((person) => {
      if (person.isLog && person.status == 1 || person.status == 2) {
        const isFriend = this.friendList.find((fd) => fd._id == person._id);
        personOnline.amount++;
        if (isFriend) {
          friendOnline.amount++;
        }

        if (person.status == 2) {
          personDontDisturb.amount++;
          if (isFriend) {
            friendDontDisturb.amount++;
          }
        }
      }

    })
  }

  private setList() {
    this.friendListService
      .getFriendList()
      .subscribe((friends: IFriendCard[]) => {
        this.userService
          .getUser()
          .subscribe((userList: IUserCard[]) => {
            this.userList = userList;
            friends.forEach((friendCard) => {
              userList.forEach((user) => {
                if (user._id == friendCard.friend_id) {
                  this.friendList.push(user);
                }
              })
            });
            this.setCardValues();
          });
      });
  }
}
