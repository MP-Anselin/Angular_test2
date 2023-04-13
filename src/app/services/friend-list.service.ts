import {Router} from '@angular/router';
import {FriendListClient} from "./clients/friend-list.client";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Injectable, OnInit} from "@angular/core";
import {IFriendCard} from "./clients/interfaces/friend.interface";

@Injectable()
export class FriendListService implements OnInit {
  private friendListSubject!: BehaviorSubject<IFriendCard[]>;
  public friendList!: Observable<IFriendCard[]>;

  constructor(
    private friendListClient: FriendListClient,
    private router: Router
  ) {
    this.friendListSubject = new BehaviorSubject<any>(null);
    this.friendList = this.friendListSubject.asObservable();
    this.setFriendList();
  }


  ngOnInit(): void {
  }

  public get allFriend(): IFriendCard[] {
    return this.friendListSubject.value;
  }

  public set allFriend(userList: IFriendCard[]) {
    this.friendListSubject.next(userList);
  }

  public getFriendList(): Observable<IFriendCard[]> {
    return this.friendListClient.getFriendList()
  }

  public addFriend(userId: string): Subscription {
    return this.friendListClient
      .addFriend(userId)
      .subscribe((result) => {
        return result;
      });
  }

  public setFriendList(){
    this.getFriends()
      .subscribe((userList: IFriendCard[]) => {
        this.friendListSubject = new BehaviorSubject<IFriendCard[]>(userList);
        this.friendListSubject.next(userList);
      });
  }

  public removeFriend(userId: string): void {
    const friendCard = this.findFriend(userId, this.allFriend);
    if (friendCard) {
      this.friendListClient
        .removeFriend(friendCard._id)
        .subscribe((result) => {
        });
    }
  }

  public getFriends(): Observable<any> {
    return this.friendListClient.getFriendList();
  }

  public findFriend(id: string, friendList: IFriendCard[]) {
    if (!friendList)
      return null;
    return friendList.find((element: IFriendCard) => {
      return element.friend_id === id;
    })
  }
}
