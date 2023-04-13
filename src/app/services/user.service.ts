import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Injectable, OnInit} from "@angular/core";
import {UserClient} from "./clients/user.client";
import {IUserCard} from "./clients/interfaces/user.interface";

@Injectable()
export class UserService implements OnInit{
  private userListSubject!: BehaviorSubject<IUserCard[]>;
  public userList!: Observable<IUserCard[]>;

  constructor(
    private userClient: UserClient,
    private router: Router
  ) {
    this.userListSubject = new BehaviorSubject<any>(null);
    this.userList = this.userListSubject.asObservable();
  }

  ngOnInit(): void {
    this.setUser();
  }

  public getUserInfo(): Observable<any> {
    return this.userClient.getUser();
  }

  public get allUser(): IUserCard[] {
    return this.userListSubject.value;
  }

  public set allUser(userList: IUserCard[]) {
    this.userListSubject.next(userList);
  }

  public setUser() {
    this.getUser().subscribe((userList: IUserCard[]) => {
      this.userListSubject = new BehaviorSubject<IUserCard[]>(userList);
      this.userListSubject.next(userList);
    });
  }

  public getUser(): Observable<any> {
    return this.userClient.getAllUser();
  }

  public updateUser(userData: IUserCard) {
    this.userClient
      .updateUserData(userData)
      .subscribe((el) => {
      })
  }
}
